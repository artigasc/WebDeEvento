import { Component, OnInit, Directive, ElementRef, Input, HostListener } from '@angular/core';
import TypeDocumentModel from '../../models/typedocument.model';
import { HubService } from '../../services/hub.service';
import CountryModel from '../../models/country.model';
import { Global, Views, Helper } from '../../global.module';
import DepartmentModel from '../../models/department.model';
import ProvinceModel from '../../models/province.model';
import DistrictModel from '../../models/district.model';
import NacionalityModel from '../../models/nacionality.model';
import { EventService } from '../../services/event.service';
import { ignoreElements } from 'rxjs-compat/operator/ignoreElements';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { parse } from 'querystring';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import ContactModel from '../../models/contact.model';
import ReservationModel from '../../models/reservation.model';
import ReservationView from '../../models/reservationview.model';
import MapModel from '../../models/map.model';

@Component({
  selector: 'app-root',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

@Directive({
  selector: '[OnlyNumber]'
})

export class ReservationComponent implements OnInit {
 

  title = 'SolutionEventFrontEnd';
  countries: CountryModel[] = [];

  public dateStr= "";


  public newReservation: ReservationModel = new ReservationModel();

  language: string;
  public reservationView: ReservationView;
  mapView: MapModel;
 
  public contact: ContactModel = new ContactModel();
  public date1Str: string;
  public date2Str: string;

  numberplanValid = true;
  numberValid = true;
  detailValid = true;
  standnameValid = true;
  anexoValid = true;
  phoneValid = true;
  chargeValid = true;
  exhibitorValid = true;
  countryValid = true;
  legalValid = true;
  cityValid = true;
  emailValid = true;
  addressValid = true;
  webpageValid = true;
  rubroValid = true;
  rucValid = true;
  socialnameValid = true;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;

  constructor(
    private hubService: HubService,
    private eventService: EventService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }


  scroll(el) {
    el.scrollIntoView();
  }

  async ngOnInit(): Promise<void> {
    this.spinnerService.show();
    await this.getReservationView()
    this.getCountries();
    this.getMapView();
    this.spinnerService.hide();
  }

  sendContactMail() {
   
    if (!this.validateElementContact()) {
      this.spinnerService.show();
    this.eventService.sendContactMail(this.contact).subscribe((res) => {
        this.spinnerService.hide();
        if (res.data === "true") {
          console.log(res)
          Swal(
            'Su correo ha sido enviado!',
            'Le atenderemos a la brevedad',
            'success'
          )
          location.reload();
        } else if (res.data === "false") {
          Swal(
            'Envio Fallido!',
            'Su correo no pudo ser enviado. intente mas tarde',
            'error'
          )
        }
      })
  }else{
      Swal('Existen campos requeridos vacíos', '', 'warning');
    }
  
  }

  getCountries() {
    this.hubService.getCountries()
      .subscribe(data => {
        if (data.status === Global.responseOk)
          this.countries = data.data
      })
  }
 

  saveReservation() {
    console.log(this.newReservation);
    
    try {
      if (!this.existFieldsEmpty()) {
        this.spinnerService.show();
        this.eventService.saveReservation(this.newReservation)
          .subscribe((res) => {
           
            this.spinnerService.hide();
            if (res.data === "true") {
              
              
              Swal(
                'Registro Exitoso!',
                'Verifique su correo electrónico',
                'success'
              )
              location.reload();
            } else {
              Swal(
                'Registro Fallido!',
                'Su registro no pudo ser procesado. Comununíquese con nosotros',
                'error'
              )
            }
          })
      } else {
        Swal('Existen campos requeridos vacíos', '', 'warning');
      }

    } catch (e) {
      console.log(e)
      Swal(
        'Registro Fallido!',
        'Su registro no pudo ser procesado. Comununíquese con nosotros',
        'error'
      )
    }

  }

 

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
 

    return true;

  }



  existFieldsEmpty(): boolean {
    var result = false;
    
    if (this.newReservation.socialname === undefined) {
      this.socialnameValid = false;
      
      result = true;
    } else {
      this.socialnameValid = true;
    }
    if (this.newReservation.ruc == undefined) {
      this.rucValid = false;
    
      result = true;
    } else {
      this.rucValid = true;
    }
   
    if (this.newReservation.rubro == undefined) {
      this.rubroValid = false;
 
      result = true;
    } else {
      this.rubroValid = true;
    }
    if (this.newReservation.webpage == undefined) {
      this.webpageValid = false;
    
      result = true;
    } else {
      this.webpageValid = true;
    }
  
    if (this.newReservation.address == undefined) {
      this.addressValid = false;
    
      result = true;
    } else {
      this.addressValid = true;
    }

    if (this.newReservation.email == undefined) {
      this.emailValid = false;
    
      result = true;
    } else {
      this.emailValid = true;
    }

    if (this.newReservation.city == undefined) {
      this.cityValid = false;
  
      result = true;
    } else {
      this.cityValid = true;
    }

    if (this.newReservation.legal == undefined) {
     
      this.legalValid = false;
      result = true;
    }
    else {
      this.legalValid = true;
    }
    
    if (this.newReservation.country == undefined) {
      this.countryValid = false;
      
      result = true;
    } else {
      this.countryValid = true;
    }
    if (this.newReservation.exhibitor == undefined) {
      this.exhibitorValid = false;
      
      result = true;
    } else {
      this.exhibitorValid = true;
    }

    if (this.newReservation.charge == undefined) {
      this.chargeValid = false;
      
      result = true;
    } else {
      this.chargeValid = true;
    }
    if (this.newReservation.phone == undefined) {
      this.phoneValid = false;

      result = true;
    } else {
      this.phoneValid = true;
    }
    if (this.newReservation.anexo == undefined) {
      this.anexoValid = false;
  
      result = true;
    } else {
      this.anexoValid = true;
    }
    if (this.newReservation.standname == undefined) {
      this.standnameValid = false;
  
      result = true;
    } else {
      this.standnameValid = true;
    }
    if (this.newReservation.email == undefined) {
      this.emailValid = false;
    
      result = true;
    } else {
      this.emailValid = true;
    }
    if (this.newReservation.detail == undefined) {
      this.detailValid = false;
      result = true;
    } else {
      this.detailValid = true;
    }
    if (this.newReservation.number == undefined) {
      this.numberValid = false;
    
      result = true;
    } else {
      this.numberValid = true;
    }
    if (this.newReservation.numberplan == undefined) {
      this.numberplanValid = false;
     
      result = true;
    } else {
      this.numberplanValid = true;
    }
    return result;
  }

 

  getReservationView() {
    this.language = this.cookieService.get('lang');
    this.hubService.getContent(Global.idEvent, this.language, Views.reservationView)
      .subscribe(data => {
     
        if (data.status === Global.responseOk) {
          this.reservationView = data.data as ReservationView;
        }
      });
  }

  getMapView() {
    this.language = this.cookieService.get('lang');
    this.hubService.getContent(Global.idEvent, this.language, Views.mapView)
      .subscribe(data => {
        if (data.status === Global.responseOk) {
          this.mapView = data.data as MapModel;
          var date1 = new Date(this.mapView.StandPrices[0].date1.toString());
          var date2 = new Date(this.mapView.StandPrices[0].date2.toString());
          this.date1Str = date1.getDay().toString() + "/" + date1.getMonth().toString() + "/" + date1.getFullYear().toString();
          this.date2Str = date2.getDay().toString() + "/" + date2.getMonth().toString() + "/" + date2.getFullYear().toString();
        }
      });
  }

  validateElementContact() {
      var result = false;

      if (this.contact.name === undefined) {
        this.namecontactValid = false;
        result = true;
      } else {
        this.namecontactValid = true;
    }
    if (this.contact.lastname === undefined) {
        this.lastnamecontactValid = false;
        result = true;
      } else {
      this.lastnamecontactValid = true;
    }
    if (this.contact.email === undefined) {
        this.emailcontactValid = false;
        result = true;
      } else {
      this.emailcontactValid = true;
    }
    if (this.contact.message === undefined) {
        this.messageValid = false;
        result = true;
      } else {
      this.messageValid = true;
      }
    return result;
  }

}



class Inscription {
  EVENT: {
    eventname: string;
    place: string;
    datebegin: string;
    dateend: string;
    duration: string;
    regulation: string;
  };
  ConceptPay: object
}

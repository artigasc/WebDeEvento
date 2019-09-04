import { Component } from '@angular/core';
import { HubService } from '../../../services/hub.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Global, Views } from '../../../global.module';
import { CookieService } from 'ngx-cookie-service';
import CharacteristicsModel from '../../../models/characteristic.model';
import BenefitsModel from '../../../models/benefits.model';
import MapModel from '../../../models/map.model';
import Swal from 'sweetalert2'
import ContactModel from '../../../models/contact.model';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './exhibitiondetails.component.html',
  styleUrls: ['./exhibitiondetails.component.scss']
})
export class ExhibitionDetailsComponent {
  date2Str: string;
  date1Str: string;
  title = 'SolutionEventFrontEnd';

  characteristics: CharacteristicsModel;
  benefits: BenefitsModel;
  mapView: MapModel;
  language: string;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;

  public contact: ContactModel = new ContactModel();

  scroll(el) {
    el.scrollIntoView();
  }

  constructor(
    private hubService: HubService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cookieService: CookieService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {

    this.spinnerService.show();
    this.getMapView();
    this.spinnerService.hide();

  }

  //getCharacteristicsView() {
  //  this.language = this.cookieService.get('lang');
  //  this.hubService.getContent(Global.idEvent, this.language, Views.characteristicsView)
  //    .subscribe(data => {
  //      if (data.status === Global.responseOk) {
  //        this.characteristics = data.data as CharacteristicsModel;
  //        var date1 = new Date(this.characteristics.StandPrices[0].date1.toString());
  //        var date2 = new Date(this.characteristics.StandPrices[0].date1.toString());
  //        this.characteristics.objFeatures.date1Str = date1.getDay().toString() + "/" + date1.getMonth().toString() + "/" + date1.getFullYear().toString();
  //        this.characteristics.objFeatures.date2Str = date2.getDay().toString() + "/" + date2.getMonth().toString() + "/" + date2.getFullYear().toString();
  //      }
  //    });
  //}

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
    } else {
      Swal('Existen campos requeridos vacíos', '', 'warning');
    }

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



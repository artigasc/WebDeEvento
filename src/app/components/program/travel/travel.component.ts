import { Component, OnInit } from '@angular/core';
import { Global, Views, Helper } from '../../../global.module';
import { HubService } from '../../../services/hub.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'lodash';
import ContactModel from '../../../models/contact.model';
import { EventService } from '../../../services/event.service';
import Swal from 'sweetalert2'
import ProgramModel from '../../../models/course.model';
@Component({
  selector: 'app-root',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit{
  title = 'SolutionEventFrontEnd';
  language: string;
  public dateStr: string;
  fieldTrip: ProgramModel;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;

  public contact: ContactModel = new ContactModel();

  constructor(
    private hubService: HubService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cookieService: CookieService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getTravelView();
    this.spinnerService.hide();
  }

  getTravelView() {
    this.language = this.cookieService.get('lang');
    this.hubService.getContent(Global.idEvent, this.language, Views.coursesView)
      .subscribe(data => {
        if (data.status === Global.responseOk) {
          console.log(data)
          this.fieldTrip = data.data as ProgramModel;

          this.fieldTrip.Trips = _.orderBy(this.fieldTrip.Trips, ['Position'], ['asc']);

          for (let el of this.fieldTrip.Courses) {

            var mydatebegin = new Date(el.datebegin);
            var mydateend = new Date(el.dateend);
            this.dateStr = mydatebegin.getUTCDate().toString() + " " + this.fieldTrip.EVENT.connectors.strto + " " + mydateend.getUTCDate().toString()
              + " " + this.fieldTrip.EVENT.connectors.strof + " " + Helper.GetNameMonth(this.language, mydateend.getMonth()) + " " +
              + mydateend.getFullYear().toString();
            el.dateStr = this.dateStr;

          }


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

class Trip {
  EVENT: {
    tripsubtitle: string;
    tripdescription: string;
    contactinfo: string;
  };
  Trips: TripsData[];
  ButtonInscriptionText: string = "Inscripción";
  ButtonMoreInfoText: string = "Más Info";
}
class TripsData {
  name: string;
  description: string;
  place: string;
  urlfile: string;
  datebegin: string;
  dateend: string;
  Position: number;
  dateStr: string;
}

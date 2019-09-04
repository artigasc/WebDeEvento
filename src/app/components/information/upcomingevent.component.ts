import { Component, OnInit } from '@angular/core';
import MapModel from '../../models/map.model';
import { Views, Global, Helper } from '../../global.module';
import { HubService } from '../../services/hub.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CookieService } from 'ngx-cookie-service';
import NextEventModel from '../../models/nextevent.model';
import Swal from 'sweetalert2'
import { EventService } from '../../services/event.service';
import ContactModel from '../../models/contact.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './upcomingevent.component.html',
  styleUrls: ['./upcomingevent.component.scss']
})
export class UpcomingEventComponent implements OnInit {
  mapView: MapModel;
  dateStr: string;
  nextEvent: NextEventModel;
  language: any;
  title = 'SolutionEventFrontEnd';
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
    this.getNextEventView();
    this.getMapView();
    this.spinnerService.hide();
  }

  getNextEventView() {
    this.language = this.cookieService.get('lang');
    try {
      this.hubService.getContent(Global.idEvent, this.language, Views.nextEventsView)
        .subscribe(data => {
          console.log(data);
          if (data.status === Global.responseOk) {

            this.nextEvent = data.data as NextEventModel;
            this.nextEvent.Events = _.orderBy(this.nextEvent.Events, ['Position'], ['asc']);
            for (var i = 0; i < this.nextEvent.Events.length; i++) {
              var mydatebegin = new Date();
              var mydateend = new Date();
              mydatebegin = new Date(this.nextEvent.Events[i].date1);
              mydateend = new Date(this.nextEvent.Events[i].date2);
              if (mydatebegin.getMonth() !== mydateend.getMonth()) {
                this.nextEvent.Events[i].datestr1 = mydatebegin.getUTCDate().toString() +
                  " " + Helper.GetNameMonth(this.language, mydatebegin.getMonth()) +
                  ", " + mydateend.getUTCDate().toString() + " " + Helper.GetNameMonth(this.language, mydateend.getMonth()) +
                  " " + mydateend.getFullYear().toString();
              } else {
                this.nextEvent.Events[i].datestr1 = mydatebegin.getUTCDate().toString() +
                  ", " + mydateend.getUTCDate().toString()+" "+ Helper.GetNameMonth(this.language, mydatebegin.getMonth()) +
                  " " + mydateend.getFullYear().toString();
              }
            }
          }
        });
    } catch (e) {
      console.log(e.message)
    }

  }

  getMapView() {
    this.language = this.cookieService.get('lang');
    this.hubService.getContent(Global.idEvent, this.language, Views.mapView)
      .subscribe(data => {
        if (data.status === Global.responseOk) {
          this.mapView = data.data as MapModel;

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



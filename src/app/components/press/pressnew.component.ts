import { Component, OnInit } from '@angular/core';
import { Views, Global, Helper } from '../../global.module';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HubService } from '../../services/hub.service';
import { CookieService } from 'ngx-cookie-service';
import PressNoteModel from '../../models/pressnotes.model';
import MapModel from '../../models/map.model';
import Swal from 'sweetalert2'
import { EventService } from '../../services/event.service';
import ContactModel from '../../models/contact.model';


@Component({
  selector: 'app-root',
  templateUrl: './pressnew.component.html',
  styleUrls: ['./pressnew.component.scss']
})
export class PressNewComponent implements OnInit{
 
  mapView: MapModel;
  dateStr: string;
  pressNote: PressNoteModel;
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
    this.getPressNoteView();
    this.getMapView();
    this.spinnerService.hide();
  }

  getPressNoteView() {
    this.language = this.cookieService.get('lang');
    try {
      this.hubService.getContent(Global.idEvent, this.language, Views.pressView)
        .subscribe(data => {
          //console.log(data);
          if (data.status === Global.responseOk) {
            this.pressNote = data.data as PressNoteModel;
            var mydatebegin = new Date();
            

            mydatebegin = new Date(this.pressNote.objNoteInfo.date);
  
            this.dateStr = mydatebegin.getUTCDate().toString() + " " + this.pressNote.EVENT.connectors.strof + " "+
              Helper.GetNameMonth(this.language, mydatebegin.getMonth())
              + " " + mydatebegin.getFullYear().toString();
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



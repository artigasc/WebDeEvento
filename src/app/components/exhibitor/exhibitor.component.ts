import { Response } from '@angular/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, HostListener, VERSION, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HubService } from '../../services/hub.service';
import { Global, Views, Helper } from '../../global.module';
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'lodash';
import MenuModel from '../../models/menu.model';
import ThematicSessionModel from '../../models/thematicsession.model';
import HomeModel from '../../models/home.model';
import ContactModel from '../../models/contact.model';
import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'home',
  templateUrl: './exhibitor.component.html',
  styleUrls: ['./exhibitor.component.scss']
})
export class ExhibitorComponent implements OnInit{
  homeInfo: HomeModel;
  language: string;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;

  public contact: ContactModel = new ContactModel();

  public exhibitorsUrl = Global.exhibitorsUrl;
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private hubService: HubService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cookieService: CookieService,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {

    this.spinnerService.show();
    this.getMainMenuView();
    this.spinnerService.hide();

}
 

  getMainMenuView() {
    this.language = this.cookieService.get('lang');

    this.hubService.getContent(Global.idEvent, this.language, Views.mainMenuView)
      .subscribe(data => {
        if (data.status === Global.responseOk) {
          this.homeInfo = data.data as HomeModel;

          this.homeInfo.Master = _.orderBy(this.homeInfo.Master, ['position'], ['asc']);
         
         
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

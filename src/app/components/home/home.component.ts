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
import Swal from 'sweetalert2';
import * as $ from "jquery"

declare var $: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  async ngOnInit() {

    this.spinnerService.show();
    await this.getMainMenuView();
    this.spinnerService.hide();

  }

 async getMainMenuView() {
    this.language = this.cookieService.get('lang');

    await this.hubService.getContentAsync(Global.idEvent, this.language, Views.mainMenuView)
      .then(data => {
        if (data.status === Global.responseOk) {
          this.homeInfo = data.data as HomeModel;

          var mydatebegin = new Date();
          var mydateend = new Date();

            mydatebegin = new Date(this.homeInfo.EVENT.datebegin);
            mydateend = new Date(this.homeInfo.EVENT.dateend);
            this.homeInfo.EVENT.dateStr = mydatebegin.getUTCDate().toString() + " " + this.homeInfo.EVENT.connectors.strto + " " + mydateend.getUTCDate().toString()
              + " " + this.homeInfo.EVENT.connectors.strof + " " +Helper.GetNameMonth(this.language, mydateend.getMonth())
              + " " +mydateend.getFullYear().toString();
          
          this.homeInfo.EVENT.hourStart = mydatebegin.toString().substr(15, 6) + " a.m.";
          this.homeInfo.EVENT.hourEnd = mydateend.toString().substr(15, 6) + " p.m.";
          this.homeInfo.Master = _.orderBy(this.homeInfo.Master, ['position'], ['asc']);
          this.homeInfo.Sessions = _.orderBy(this.homeInfo.Sessions, ['Position'], ['asc']);
         
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

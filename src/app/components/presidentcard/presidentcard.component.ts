import { Component, OnInit } from '@angular/core';
import { HubService } from '../../services/hub.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Global } from '../../global.module';
import { Views } from '../../global.module';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import OrganizationModel from '../../models/organization.model';
import { EventService } from '../../services/event.service';
import ContactModel from '../../models/contact.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './presidentcard.component.html',
  styleUrls: ['./presidentcard.component.scss']
})
export class PresidentCardComponent implements OnInit {
  language: string;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;

  public contact: ContactModel = new ContactModel();
  

  constructor(
    private hubService: HubService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cookieService: CookieService,
    private router: Router,
    private eventService: EventService,
  ) { }
  title = 'SolutionEventFrontEnd';

  organizationView: OrganizationModel;
  directoryUrl = Global.directoryUrl;
  async ngOnInit() {
    this.spinnerService.show();
    await this.getContentOrganizationView();
    this.spinnerService.hide();
 
    }
  
  async getContentOrganizationView() {
    this.language = this.cookieService.get('lang');
    await this.hubService.getContentAsync(Global.idEvent, this.language, Views.organizationList)
      .then(data => {
        if (data.status === Global.responseOk) {
          this.organizationView = data.data as OrganizationModel;
          //console.log(this.organizationView)
          this.organizationView.Organization = _.orderBy(this.organizationView.Organization, ['Position'], ['asc']);
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



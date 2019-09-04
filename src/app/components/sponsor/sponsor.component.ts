import { Component } from '@angular/core';
import { Global, Views } from '../../global.module';
import { HubService } from '../../services/hub.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CookieService } from 'ngx-cookie-service';
import CharacteristicsModel from '../../models/characteristic.model';
import SponsorsModel from '../../models/sponsor.model';
import * as _ from 'lodash';
import MapModel from '../../models/map.model';
import Swal from 'sweetalert2'
import { EventService } from '../../services/event.service';
import ContactModel from '../../models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent {
  title = 'SolutionEventFrontEnd';
  public sponsorsUrl = Global.sponsorsUrl;
  sponsors: SponsorsModel;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;

  public contact: ContactModel = new ContactModel();
  
  language: string;
  mapView: MapModel;
  scroll(el) {
    el.scrollIntoView();
  }

  constructor(
    private hubService: HubService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cookieService: CookieService,
    private eventService: EventService
  ) { }

 async  ngOnInit() {

    this.spinnerService.show();
    await this.getSponsorsView();
    this.getMapView();
    this.spinnerService.hide();

  }

  async getSponsorsView() {
    this.language = this.cookieService.get('lang');
    try {
      await this.hubService.getContentAsync(Global.idEvent, this.language, Views.sponsorView)
        .then(data => {
         
          if (data.status === Global.responseOk) {
            this.sponsors = data.data as SponsorsModel;
           
           // this.sponsors.Groups = this.getGroups();
            var ArrGroups: Array<any> = [];
            var sponsorElement = null;
            
            for (let el of this.sponsors.Groups) {
              var DataGroup: GroupsData = new GroupsData();
              DataGroup.SponsorInfo = [];
              if (el.type === 1){
                for (let elem of el.Sponsors) {
                 
                  sponsorElement = _.find(this.sponsors.Sponsors, { id: elem });
                  
                  DataGroup.SponsorInfo.push(sponsorElement);
                  
                }
                
                DataGroup.color = el.color;
                DataGroup.groupname = el.groupname;
                DataGroup.position = el.position;

                DataGroup.type = el.type;
                ArrGroups.push(DataGroup);
               
              }
            }
           
            this.sponsors.Groups = _.orderBy(ArrGroups, ['position'], ['asc']);;
            
         }
        });
    } catch (e) {
      console.log(e.message )
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

class GroupsData {
  color: string;
  position: string;
  type: string;
  groupname: string;
  Sponsors: [""];
  SponsorInfo: SponsorData[];
}

class SponsorData {
  id: string;
  urllogo: string;
  urlpage: string;
  position: string;
}

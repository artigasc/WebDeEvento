import { Component, OnInit } from '@angular/core';
import { HubService } from '../../../services/hub.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CookieService } from 'ngx-cookie-service';
import { Global, Views, Helper } from '../../../global.module';
import * as _ from 'lodash';
import Swal from 'sweetalert2'
import { EventService } from '../../../services/event.service';
import ContactModel from '../../../models/contact.model';
import ProgramModel from '../../../models/course.model';

@Component({
  selector: 'app-root',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    
  title = 'SolutionEventFrontEnd';
  language: string;
  public dateStr: string;
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
  coursesView: ProgramModel;
  scroll(el) {
    el.scrollIntoView();
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getCoursesView();
    this.spinnerService.hide();
  }

  getCoursesView() {
    this.language = this.cookieService.get('lang');
    this.hubService.getContent(Global.idEvent, this.language, Views.coursesView)
      .subscribe(data => {
        if (data.status === Global.responseOk) {
          console.log(data)
          this.coursesView = data.data as ProgramModel;
    
          this.coursesView.Courses = _.orderBy(this.coursesView.Courses, ['Position'], ['asc']);
        
            for (let el of this.coursesView.Courses) {
     
                var mydatebegin = new Date(el.datebegin);
                var mydateend = new Date(el.dateend);
                this.dateStr = mydatebegin.getUTCDate().toString() + " " + this.coursesView.EVENT.connectors.strto + " "  + mydateend.getUTCDate().toString()
                  + " "+ this.coursesView.EVENT.connectors.strof+" " + Helper.GetNameMonth(this.language, mydateend.getMonth())+" "+
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






import CustomerModel from '../models/customer.model';
import MenuModel from '../models/menu.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Global } from "../global.module";
import 'rxjs/add/operator/map';
import ContactModel from '../models/contact.model';
import ReservationModel from '../models/reservation.model';
import ResponseObjectModel from '../models/responseobject.model';
import ResponseCulquiModel from '../models/responseculqui.model';
//var rp = require('request-promise');

@Injectable()
export class EventService {
   
    
  private menuUrl = `${Global.apiurl}/menu`;
  private eventUrlCustomer = `${Global.apiurl}/event/addcustomer`;
  private eventBaseUrl = `${Global.apiurl}/event`;
  private culquitokenBaseUrl = `${Global.culquiurl}`;
  
  constructor(
    private http: HttpClient
  ) {
  }

  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }

  getAll(): Observable<MenuModel[]> {
    return this.http.get(this.menuUrl)
      .map(res => {
        return new MenuModel[0];
      })
  }

  async createCustomerinEvent(customer: CustomerModel, idevent): Promise<any> {
    let createUrl = `${this.eventUrlCustomer}/${idevent}`
    return await this.http.post(createUrl, customer).map(res => {
      return res;
    }).toPromise();
  }

  sendContactMail(contact: ContactModel): Observable<any> {
    let contactUrl = `${this.eventBaseUrl}`
    return this.http.post(contactUrl + "/contactus/", contact);
  }

  validateCustomerForPartner(customer: CustomerModel): any {
    return this.http.post(this.eventBaseUrl + "/validatecustomer", customer);
  }

  saveReservation(reservation: ReservationModel): Observable<any> {
    let reservationUrl = `${this.eventBaseUrl}`
    return this.http.post(reservationUrl + "/standReserve", reservation);
  }

  async culquiGenerateToken(paymentdetails): Promise<ResponseCulquiModel> {
    let tokenUrl = `${this.culquitokenBaseUrl}`
    var body = JSON.stringify(paymentdetails);
    const headerSettings: { [name: string]: string | string[]; } = {};
    headerSettings['Authorization'] = 'Bearer ' + Global.sourceIdToken;
    headerSettings['Content-Type'] = 'application/json';
    var newHeader = new HttpHeaders(headerSettings);
    var response = null;
   
    return await this.http.post(tokenUrl, body, { headers: newHeader })
      .map(res => {
        console.log(res);
        return res as ResponseCulquiModel;
      }).catch((err) => {
        // Do messaging and error handling here
        console.log(err)
        return Observable.of(err);
      }).toPromise();
   
   
  }
}

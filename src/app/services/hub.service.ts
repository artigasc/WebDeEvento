import MenuModel from '../models/menu.model';
import ResponseModel from '../models/response.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Global } from "../global.module";
import 'rxjs/add/operator/map';
import ResponseObjectModel from '../models/responseobject.model';


@Injectable()
export class HubService {
    
  private menuUrl = `${Global.apiurl}/menu`;
  private countryUrl = `${Global.apiurl}/country`;
  private contentUrl = `${Global.apiurl}/content`;
  private masterUrl = `${Global.apiurl}/master`;
  menuList: MenuModel[];
  constructor(
    private http: HttpClient
  ) { }

  getMenus(lang): Observable<ResponseModel> {
     let params = new HttpParams().set('lang', lang);
     return this.http.get(this.menuUrl, { params: params })
       .map(res => {
         return res as ResponseModel;
       })
  }

  getCountries(): Observable<ResponseModel> {
    return this.http.get(this.countryUrl)
      .map(res => {
        return res as ResponseModel;
      })
  }

  async getTypeDocument(language): Promise<ResponseModel> {
    let params = new HttpParams().set('lang', language);
    return this.http.get(this.masterUrl +"/typedocument", {params:params})
      .map(res => {
        return res as ResponseModel;
      }).toPromise();
  }

  getDepartments(idcountry): Observable<ResponseModel> {
    let params = new HttpParams().set('idcountry', idcountry);

    return this.http.get(this.countryUrl + "/departament", { params: params })
      .map(res => {
        return res as ResponseModel;
      })
  }

  getProvinces(idcountry, iddepartment): Observable<ResponseModel> {
    let params = new HttpParams().set('idcountry', idcountry).set('iddepartment', iddepartment);   
    return this.http.get(this.countryUrl + "/province", { params: params })
      .map(res => {
        return res as ResponseModel;
      })
  }

  getDistricts(idcountry, iddepartment, idprovince): Observable<ResponseModel> {
    let params = new HttpParams().set('idcountry', idcountry).set('iddepartment', iddepartment).set('idprovince', idprovince);
    return this.http.get(this.countryUrl + "/district", { params: params })
      .map(res => {
        return res as ResponseModel;
      })
  }

  getContent(idevent, language, viewName): Observable<ResponseObjectModel> {
    let params = new HttpParams().set('id', idevent).set('viewName', viewName).set('lang', language).set('platform', Global.platform);
    try {
      return this.http.get(this.contentUrl, { params: params })
        .map(res => {
          return res as ResponseObjectModel;
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  async getContentAsync(idevent, language, viewName): Promise<ResponseObjectModel> {
    let params = new HttpParams().set('id', idevent).set('viewName', viewName).set('lang', language).set('platform', Global.platform);
      try {
        return await this.http.get<ResponseObjectModel>(this.contentUrl, { params: params })
          .map(res => {
         
            return res;
          }).toPromise();
      } catch(e) {
        console.log(e.message)
      }
    }

 

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

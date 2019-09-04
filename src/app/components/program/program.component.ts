import { Component, OnInit, Directive, ElementRef, Input, HostListener } from '@angular/core';
import CustomerModel from '../../models/customer.model';
import TypeDocumentModel from '../../models/typedocument.model';
import { HubService } from '../../services/hub.service';
import CountryModel from '../../models/country.model';
import { Global, Views, Helper } from '../../global.module';
import DepartmentModel from '../../models/department.model';
import ProvinceModel from '../../models/province.model';
import DistrictModel from '../../models/district.model';
import NacionalityModel from '../../models/nacionality.model';
import { EventService } from '../../services/event.service';
import { ignoreElements } from 'rxjs-compat/operator/ignoreElements';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { parse } from 'querystring';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as _ from 'lodash';
import ContactModel from '../../models/contact.model';
import ProgramModel from '../../models/course.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})

@Directive({
  selector: '[OnlyNumber]'
})

export class ProgramComponent implements OnInit {

  title = 'SolutionEventFrontEnd';
  optionIdentityNumberType: TypeDocumentModel[] = [];
  optionBillingIdentityNumberType: TypeDocumentModel[] = [];
  public optionIdentityNumberTypeGeneral: TypeDocumentModel[] = [];
  countries: CountryModel[] = [];
  departments: DepartmentModel[] = [];
  provinces: ProvinceModel[] = [];
  districts: DistrictModel[] = [];
  optionNacionality: NacionalityModel[] = [];
  flagButtonSave = false;
  documentLength = 15;
  firstnameValid = true;
  secondlastnameValid = true;
  lastnameValid = true;
  addressValid = true;
  emailValid = true;
  namecompanyValid = true;
  celularValid = true;
  billingidentityValid = true;
  billingcontactemailValid = true;
  billingcontactnumberValid = true;
  billingcontactnameValid = true;
  billingaddressValid = true;
  billingnameValid = true;
  payemailValid = true;
  payemail: string;
  nameValid = true;
  lastnamecontactValid = true;
  emailcontactValid = true;
  messageValid = true;
  namecontactValid = true;
  identitynumberValid = true;

  fileValid = true;

  public dateStr= "";
  public flagValidAssociatte = false;
  public flagDisableNacionality = true;

  public flagBillingDocumentType = true;
  public flagbillingidentity = true;
  public flagbillingname = true;
  public isAsocciatedWithDocument = true;
  public newCustomer: CustomerModel = new CustomerModel();
  language: string;
  public inscriptionView: ProgramModel = new ProgramModel();
  public inscriptionData: object;
  card_numberValid = true;
    cvvValid =true;
  expiration_monthValid = true;
  expiration_yearValid = true;
    cardnumber: string;
    expiration_month: string;
    cvv: string;
    expiration_year :string;
    name: string;
 
  public contact: ContactModel = new ContactModel();
 
  constructor(
    private hubService: HubService,
    private eventService: EventService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private el: ElementRef
  ) { }


  scroll(el) {
    el.scrollIntoView();
  }

async  ngOnInit() {
    this.spinnerService.show();
    await this.getContentInscriptionView()
    await this.addTypeDocument();
    await this.addTypeDocumnetBilling();
    this.addNaionality();
    this.getCountries();
    this.newCustomer.identitynumbertype = "1";
    this.newCustomer.nacionality = "P";
    this.newCustomer.country = 75;
    this.getDepartments(75);
    this.newCustomer.department = 1;
    this.getProvinces(this.newCustomer.country, this.newCustomer.department);
    this.newCustomer.province = 1;
    this.getDistrict(this.newCustomer.country, this.newCustomer.department, this.newCustomer.province);
    this.newCustomer.district = 1;
    this.newCustomer.billingtmethodstr = "1";
    this.newCustomer.billingtype = "03";
    this.newCustomer.billingdocumenttype = "1";
    this.newCustomer.partnercode = "0";
    this.documentLength = Global.maxLengthDNI;
    await this.chargeInitialDataPay();
    await _.remove(this.optionBillingIdentityNumberType, function (e) {
      return e.strCode === "6";
    });
    this.spinnerService.hide();
  }

  onFileChange(event) {
    this.newCustomer.billingdocument = event.target.files[0];
  }

  onChangeFileAttachmentAssociated(event) {
    this.newCustomer.fileattachmentcategory = event.target.files[0];
    console.log(this.newCustomer.fileattachmentcategory)
  }

 async chargeInitialDataPay() {
    if (this.inscriptionView.ConceptPay.length > 0) {
      for (var i = 0; i < this.inscriptionView.ConceptPay.length; i++) {
        if (this.inscriptionView.ConceptPay[i].bitisassociated === "") { 
          this.newCustomer.idcategory = this.inscriptionView.ConceptPay[i].strid;
          var index = i + 1;
          this.newCustomer.type = index;
          this.newCustomer.typestr = index.toString();
          var today = new Date();
          var desdedate = new Date(this.inscriptionView.ConceptPay[i].objDuration[0].dttdateto)
          if (today <= desdedate) {
            this.newCustomer.totalprice = parseFloat(this.inscriptionView.ConceptPay[i].objDuration[0].dblmount);
          } else {
            this.newCustomer.totalprice = parseFloat(this.inscriptionView.ConceptPay[i].objDuration[1].dblmount);
          }
          break;
        }
      }
    }
    }

  sendContactMail() {
   
    if (!this.validateElementContact()) {
      this.spinnerService.show();
    this.eventService.sendContactMail(this.contact).subscribe((res) => {
        this.spinnerService.hide();
        if (res.data === "true") {
         
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
  }else{
      Swal('Existen campos requeridos vacíos', '', 'warning');
    }
  
  }

  async addTypeDocument() {
    var lang = this.cookieService.get('lang');
    await this.hubService.getTypeDocument(lang)
      .then(data => {
        if (data.status === Global.responseOk) {
          this.optionIdentityNumberType = data.data;
          this.optionIdentityNumberTypeGeneral = data.data;
        }
      })
  }

  async addTypeDocumnetBilling() {
    var lang = this.cookieService.get('lang');
    await this.hubService.getTypeDocument(lang)
      .then(data => {
        if (data.status === Global.responseOk)
        this.optionBillingIdentityNumberType = data.data;
      })
  }

  getCountries() {
    this.hubService.getCountries()
      .subscribe(data => {
        if (data.status === Global.responseOk)
          this.countries = data.data
      
      })
  }

  getDepartments(idcountry) {
    this.hubService.getDepartments(idcountry)
      .subscribe(data => {
        if (data.status === Global.responseOk)
          this.departments = data.data
      })
  }

  getProvinces(idcountry, iddepartment) {
    this.hubService.getProvinces(idcountry, iddepartment)
      .subscribe(data => {

        if (data.status === Global.responseOk)
          this.provinces = data.data
      })
  }

  getDistrict(idcountry, iddepartment, idprovince) {
    this.hubService.getDistricts(idcountry, iddepartment, idprovince)
      .subscribe(data => {
        if (data.status === Global.responseOk)
          this.districts = data.data
      })
  }



  addNaionality() {
    this.optionNacionality.push(new NacionalityModel("P", "PERUANA"));
    this.optionNacionality.push(new NacionalityModel("X", "EXTRANJERA"));
  }

  async addToEvent() {
   
    this.newCustomer.firstname = this.newCustomer.firstname;
    this.newCustomer.secondfirstname = "NN";
    this.newCustomer.lastname = this.newCustomer.lastname;
    this.newCustomer.secondlastname = this.newCustomer.secondlastname;
    this.newCustomer = this.validateIdentityNumberNationality(this.newCustomer)
    this.newCustomer.instructiongade = "ING.";
    this.newCustomer.billingdistrict = this.newCustomer.district;
    this.newCustomer.billingdocument = [];
    this.newCustomer.billingcurrency = "US$";
    //this.newCustomer.totalprice = 550;
    //this.newCustomer.idcategory = "90af7fd9-58d1-4877-ae5d-ffc2127c3d9c";
    this.newCustomer.createdby = "web"
    this.newCustomer.phone = this.newCustomer.celular;
  
    this.newCustomer.lang = this.cookieService.get('lang');
   
   
    this.newCustomer.billingtmethod = +this.newCustomer.billingtmethodstr;
  
  
    try {
     
      if (!this.existFieldsEmpty()) {
        this.spinnerService.show();
        this.newCustomer.paymentdetails = await this.getPaymentDetailTDC();
        if (this.newCustomer.paymentdetails.object ==="token") {
        await this.eventService.createCustomerinEvent(this.newCustomer, "0aa9ed40-b0c7-11e8-8b99-69bdc9a7fc8e")
          .then((res) => {
              this.spinnerService.hide();
            if (res.data === "1") {
              Swal(
                'Registro Exitoso!',
                'Verifique su correo electrónico',
                'success'
              ).then(function () {
                location.reload();
              });
              
            } else if (res.data === "0") {
              Swal(
                'Registro Fallido!',
                'Su registro no pudo ser procesado. Comununíquese con nosotros',
                'error'
              )
            }
          })
        } else if (this.newCustomer.paymentdetails.object === "error") {
          this.spinnerService.hide();
          Swal('Ha ocurrido un error Validando su información de pago', this.newCustomer.paymentdetails.user_message, 'warning');
        }
      } else {
        Swal('Existen campos requeridos no completados', '', 'warning');
      }

    } catch (e) {
      console.log(e)
      this.spinnerService.hide();
      Swal(
        'Registro Fallido!',
        'Su registro no pudo ser procesado. Comununíquese con nosotros',
        'error'
      )
    }

  }

  validateIdentityNumberNationality(customer: CustomerModel): any {
    var result = customer;
    if (customer.identitynumbertype == "6") {
      result.numbertypecompany = customer.identitynumbertype;
      result.identitynumbertype = "0";
      result.numbercompany = customer.identitynumber;
      customer.identitynumber = "00";
    } else {
      result.numbercompany = "00";
      result.numbertypecompany = "0";
    }
    if (this.newCustomer.billingdocumenttype == "6") {
      result.billingcustomertype = "E";
    } else {
      result.billingcustomertype = "P";
    }
    return result;

  }

  countryChange(id) {
   
    this.spinnerService.show();
    this.getDepartments(id);
    this.getProvinces(id, 1);
    this.getDistrict(id, 1, 1);
    this.spinnerService.hide();
  }

  departmentChange(iddepartment, idcountry) {
    this.getProvinces(idcountry, iddepartment);
    this.getDistrict(idcountry, iddepartment,this.newCustomer.province)
  }

  provinceChange(idprovince, iddepartment, idcountry) {
    this.getDistrict(idcountry, iddepartment, idprovince);
  }

  nationalityChange(id) {
    this.spinnerService.show();
    if (id === "X") {
      this.hubService.getCountries()
        .subscribe(data => {
          if (data.status === Global.responseOk) {
            data.data = _.reject(data.data, function (el) { return el.strCode === "75"; });
            this.newCustomer.country = 1;
            this.countries = data.data
            this.getDepartments(1);
            this.getProvinces(1, 1);
            this.getDistrict(1, 1, 1)
            this.spinnerService.hide();
          }
        })

    } else {
      this.getCountries();
      this.newCustomer.country = 75;
      this.getDepartments(75);
      this.newCustomer.department = 1;
      this.getProvinces(this.newCustomer.country, this.newCustomer.department);
      this.newCustomer.province = 1;
      this.getDistrict(this.newCustomer.country, this.newCustomer.department, this.newCustomer.province);
      this.spinnerService.hide();
    }
  }

  validatePartner() {

    //if (this.newCustomer.type === '1') {
      this.spinnerService.show();
      this.eventService.validateCustomerForPartner(this.newCustomer)
        .subscribe(async (res) => {
          console.log(res)
          await this.spinnerService.hide();
          if (res.data == "96" || res.data == "97") {
            Swal(res.message+". Elija otra opción" + ". Eliga otra opción", '', 'error');
            this.flagButtonSave = true
          } else if (res.data == "98") {
            Swal(res.message + ". Elija otra opción", '', 'error');
            this.flagButtonSave = true
            // location.reload();
          } else if (res.data == "99") {
            Swal(res.message+". Elija otra opción", '', 'error');
            this.flagButtonSave = true
            //location.reload();
          } else if (res.data == "1") {
            this.flagButtonSave = false;
            Swal('Ud es asociado válido. Continue el registro', '', 'success');
            this.flagValidAssociatte = true;
            this.newCustomer.partnercode = res.message;
          } else {
            Swal('Ha ocurrido un error validando su información', '', 'error');
            this.flagValidAssociatte = false;
            this.flagButtonSave = false
          }
        }, err => {
          console.log("error")
        });

    //} else {
    //  this.flagButtonSave = false
    //}
  }

  noValidateActiveButton() {
    this.flagButtonSave = false;
  }


  validateFields(item) {
   
    if (item.bitfileattachment == 1) {
      this.isAsocciatedWithDocument = false;
    } else {
      this.isAsocciatedWithDocument = true;
    }
   
    if (item.bitisassociated !== '') {
      this.newCustomer.typevalidation = item.bitisassociated;
      if (this.newCustomer.identitynumber === undefined || this.newCustomer.identitynumber == "") {
        
        Swal('Introduzca un Número de Documento', '', 'warning');
        return;
      } else if (this.newCustomer.lastname === undefined || this.newCustomer.lastname === "") {
        Swal('Introduzca un Apellido Paterno', '', 'warning');
       
        return;
      } else if (this.newCustomer.identitynumbertype === undefined) {
        Swal('Seleccione un tipo de documento', '', 'warning');
      
        return;
      }
      this.validatePartner();
    } else {
      this.flagValidAssociatte = false;
      this.flagButtonSave = false;
    }
    this.newCustomer.idcategory = item.strid;
    var desdedate = new Date(item.objDuration[0].dttdateto)
    var today = new Date();
    if (today <= desdedate) {
      this.newCustomer.totalprice = item.objDuration[0].dblmount;
    } else {
      this.newCustomer.totalprice = item.objDuration[1].dblmount;
    }
   
  }

  

  identityNumberTypeChange(ididentity) {
    this.newCustomer.identitynumber = "";

    if (ididentity == 1) {
      this.documentLength = Global.maxLengthDNI;
      this.flagDisableNacionality = true;
    } else if (ididentity == 6) {
      this.documentLength = Global.maxLengthRUC;
    } else {
      this.flagDisableNacionality = false;
      this.documentLength = Global.maxLengthNotDNI;
    }
  }
  identityBillingDocumentType(ididentity) {
    this.newCustomer.billingdocumenttype = "";

    if (ididentity == 1) {
      this.documentLength = Global.maxLengthDNI;
    } else {
      this.documentLength = Global.maxLengthNotDNI;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  setInfoToBillinIdentity() {
    this.newCustomer.billingidentity = this.newCustomer.identitynumber;
  }

  setInfoToBillingName() {
  
    if (this.newCustomer.billingtype == "03") {
      this.newCustomer.billingname = this.newCustomer.firstname === undefined ? "" : this.newCustomer.firstname + " ";
      this.newCustomer.billingname += this.newCustomer.lastname === undefined ? "" : this.newCustomer.lastname + " ";
    } else if (this.newCustomer.billingtype == "01") {
      this.newCustomer.billingname = this.newCustomer.namecompany;
    }
    this.newCustomer.billingaddress = this.newCustomer.address;
  }

  async changeBillingType(billingtype) {
    //console.log(this.optionIdentityNumberTypeGeneral);
    this.optionBillingIdentityNumberType = this.optionIdentityNumberTypeGeneral;
    if (billingtype == '03') {
      this.newCustomer.billingdocumenttype = "1";
      this.newCustomer.billingcustomertype = "P";
      this.documentLength = Global.maxLengthDNI;
    } else if (billingtype == "01") {
      this.newCustomer.billingcustomertype = "E";
      this.documentLength = Global.maxLengthNotDNI;
      
     
      this.newCustomer.billingdocumenttype = "6";
    }
    this.setInfoToBillingName();
  }

  existFieldsEmpty(): boolean {
    var result = false;

    if (this.newCustomer.identitynumber === undefined || this.newCustomer.identitynumber.length< Global.maxLengthDNI ) {
      this.identitynumberValid = false;
      result = true;
    } else {
      this.identitynumberValid = true;
    }
    if (this.newCustomer.firstname === undefined) {
      this.firstnameValid = false;
      result = true;
    } else {
      this.firstnameValid = true;
    }
       
    if (this.newCustomer.lastname == undefined) {
      this.lastnameValid = false;
      result = true;
    } else {
      this.lastnameValid = true;
    }
    if (this.newCustomer.secondlastname == undefined) {
      this.secondlastnameValid = false;
      result = true;
    } else {
      this.secondlastnameValid = true;
    }
  
    if (this.newCustomer.address == undefined) {
      this.addressValid = false;
      result = true;
    } else {
      this.addressValid = true;
    }

    if (this.newCustomer.email == undefined) {
      this.emailValid = false;
      result = true;
    } else {
      this.emailValid = true;
    }

    if (this.newCustomer.celular == undefined) {
      this.celularValid = false;
      result = true;
    } else {
      this.celularValid = true;
    }
    
    if (this.newCustomer.namecompany == undefined) {
      this.namecompanyValid = false;
      result = true;
    } else {
      this.namecompanyValid = true;
    }
    //billing
    if (this.newCustomer.billingidentity == undefined) {
      this.billingidentityValid = false;
      result = true;
    } else {
      this.billingidentityValid = true;
    }

    if (this.newCustomer.billingcontactemail == undefined) {
      this.billingcontactemailValid = false;
      result = true;
    }
    else {
      this.billingcontactemailValid = true;
    }
    if (this.newCustomer.billingcontactnumber == undefined) {
      this.billingcontactnumberValid = false;
      result = true;
    }
    else {
      this.billingcontactnumberValid = true;
    }
    if (this.newCustomer.billingcontactname == undefined) {
      this.billingcontactnameValid = false;
      result = true;
    } else {
      this.billingcontactnameValid = true;
    }

    if (this.newCustomer.billingaddress == undefined) {
      this.billingaddressValid = false;
      result = true;
    } else {
      this.billingaddressValid = true;
    }
    if (this.newCustomer.billingname == undefined) {
      this.billingnameValid = false;
      result = true;
    } else {
      this.billingnameValid = true;
    }

    if (this.newCustomer.billingtmethodstr == "2") {
      if (this.newCustomer.card_number == undefined || this.newCustomer.card_number.length < 16) {
        this.card_numberValid = false;
        result = true;
      } else {
        this.card_numberValid = true;
      }

      if (this.newCustomer.cvv == undefined || this.newCustomer.cvv.length < 3) {
        this.cvvValid = false;
        result = true;
      } else {
        this.cvvValid = true;
      }
      if (this.newCustomer.expiration_month == undefined || this.newCustomer.expiration_year.length < 4) {
        this.expiration_monthValid = false;
        result = true;
      } else {
        this.expiration_monthValid = true;
      }
      if (this.newCustomer.expiration_year == undefined || this.newCustomer.expiration_year.length == 1) {
        this.expiration_yearValid = false;
        result = true;
      } else {
        this.expiration_yearValid = true;
      }
      if (this.newCustomer.name == undefined || this.newCustomer.name.length == 1) {
        this.nameValid = false;
        result = true;
      } else {
        this.nameValid = true;
      }
      if (this.newCustomer.payemail == undefined || this.newCustomer.payemail.length == 1) {
        this.payemailValid = false;
        result = true;
      } else {
        this.payemailValid = true;
      }
   }
    
    return result;
  }

 

  async getContentInscriptionView() {
    this.language = this.cookieService.get('lang');
    await this.hubService.getContentAsync(Global.idEvent, this.language, Views.inscriptionView)
      .then(data => {
        if (data.status === Global.responseOk) {
          this.inscriptionView = data.data as ProgramModel;
        
          var mydatebegin = new Date(this.inscriptionView.EVENT.datebegin);
          var mydateend = new Date(this.inscriptionView.EVENT.dateend);
          this.dateStr = mydatebegin.getUTCDate().toString() + "  " + this.inscriptionView.EVENT.connectors.strto + " " +
            mydateend.getUTCDate().toString()
            + "  " + this.inscriptionView.EVENT.connectors.strof+" " + Helper.GetNameMonth(this.language, mydateend.getMonth())
            + "  " + mydateend.getFullYear().toString();
        
        }
      });
  }

  async getPaymentDetailTDC() {
    this.cardnumber = (this.newCustomer.card_number === undefined) ? "" : this.newCustomer.card_number;
    this.cvv = (this.newCustomer.cvv === undefined) ? "" : this.newCustomer.cvv;
    this.expiration_month = (this.newCustomer.expiration_month === undefined) ? "" : this.newCustomer.expiration_month;
    this.expiration_year = (this.newCustomer.expiration_year === undefined) ? "" : this.newCustomer.expiration_year;
    this.name = (this.newCustomer.name === undefined) ? "" : this.newCustomer.name;
    this.payemail = (this.newCustomer.payemail === undefined) ? "" : this.newCustomer.payemail;

    var paymentdetails= {
      source_id: "",
      card_number: this.cardnumber,
      cvv: this.cvv,
      expiration_month: this.expiration_month,
      expiration_year: this.expiration_year,
      email: this.payemail,
      name: this.name,
      amount: this.newCustomer.totalprice,
      currency_code: "USD",
      id: "",
      user_message: "",
      object:""
    }
    try {
      paymentdetails = await this.eventService.culquiGenerateToken(paymentdetails).then(async (res) => {
        if (res instanceof HttpErrorResponse){
          res = res.error;
        }
        paymentdetails.object = res.object
        if (res.object === "token") {
          paymentdetails.source_id = res.id;

        } else if (res.object === "error") {
          paymentdetails.source_id = "";
          paymentdetails.user_message = res.user_message;
        }
        return paymentdetails;
      });
    } catch (e) {
      console.log("exception")
    }
    return paymentdetails;
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

  numberOnlyNroDoc(event): boolean {
    if (this.newCustomer.identitynumbertype === "1" || this.newCustomer.identitynumbertype === "6"
      || this.newCustomer.identitynumbertype === "A") {
      const charCode = (event.which) ? event.which : event.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
    }
    return true;
  }
}



class Inscription {
  EVENT: {
    eventname: string;
    place: string;
    datebegin: string;
    dateend: string;
    duration: string;
    regulation: string;
  };
  ConceptPay: object
}

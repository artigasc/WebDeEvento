class CustomerModel {
  firstname: string;
  secondfirstname: string;
  lastname: string;
  secondlastname: string;
  identitynumber: string;
  identitynumbertype: string;
  nacionality: string;
  numbercompany: string;
  numbertypecompany: string;
  namecompany: string;
  charge: string;
  instructiongade: string;
  position: 0;
  address: string;
  phone: string;
  celular: string;
  district: number;
  type: number;
  typestr: string;
  email: string;
  billingname: string;
  billingcustomertype: string;
  billingtype: string;
  billingdocumenttype: string;
  billingidentity: string;
  billingaddress: string;
  billingdistrict: number;
  billingcontactname: string;
  billingcontactemail: string;
  billingcontactnumber: string;
  billingdocument: any[];
  billingtmethod: number;
  billingtmethodstr: string;
  billingcurrency: string;
  partner: string;
  partnercode: string;
  totalprice: number;
  createdby: string;
  idEvent: string;
  idcategory: string;
  country: number;
  department: number;
  province: number;
  lang: string;
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  name: string;
  payemail: string;
  typevalidation: string;
  paymentdetails: {
    source_id: string,
    card_number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    email: string;
    name: string;
    amount: number;
    currency_code: string;
    user_message: string;
    object: string;
  };
  fileattachmentcategory: any[];
  constructor() {
    
  }
}

export default CustomerModel;

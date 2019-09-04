class ProgramModel {
  EVENT: {
    coursetitle: string;
    coursesubtitle: string;
    coursedescription: string;
    contactplace: string;
    activitytitle: string;
    urlbackgroundimg: string; 
    filetext: string; 
    fileurl: string; 
    fileimg: string; 
    personalinformation: string;
    datebegin: string;
    dateend: string;
    place: string; 
    eventname: string; 
    regulation: string; 
    regulationurl: string; 
    rates: string; 
    billingtitle: string; 
    contactinfo: string;
    contacttitle: string;
    contactphone: string;
    contact: string;
    contactbuttontxt: string;
    contactbuttonurl: string;
    triptitle: string; 
    moreinfo: string; 
    moreinfourl: string; 
    register: string; 
    registerurl: string; 
    latitude: string; 
    longitude: string;
    connectors: {
      strof: string,
      strto: string,
    },
    placeholder: {
      strName: string,
      strLastname: string,
      strMail: string,
      strMessage: string,
    }
  };
  Courses: CoursesData[];
  ConceptPay: ConceptPayData[];
  Trips: TripsData[];
  coursetitle: string;
  triptitle: string;
  objConditionRegister: {
    Array: any[];
  };
  objBankInfo: {
    Name: string;
    Array: any[];
  }
  
}
class CoursesData {
  name: string;
  description: string;
  place: string;
  urlfile: string;
  datebegin: string;
  dateend: string;
  Position: number;
  dateStr: string;
  urllogo: string;

}
class objDurationData  {
  strid: string;
  strname: string;
  dttdateto: string;
  dblmount: string;
  strcurrency: string;

}

class TripsData {
  id: string;
  name: string;
  description: string;
  place: string;
  urlfile: string;
  datebegin: string;
  dateend: string;
  Position: string;
  urllogo: string;
}

class ConceptPayData {
  strid: string;
  strnamecategory: string;
  bitisassociated: string;
  objDuration: objDurationData[];

}

export default ProgramModel;


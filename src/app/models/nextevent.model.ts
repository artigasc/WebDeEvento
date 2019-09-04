class EmercencyData {
  title: string;
  number: string;
  numbertext: string;
}
class EventsData {
  id: string;
  Title: string;
  Name: string;
  Description: string;
  date1: string;
  date2: string;
  Address: string;
  UrlPicture: string;
  Url: string;
  datestr1: string;
  datestr2: string;
}

class NextEventModel {
  Events: EventsData[];
  Emergency: EmercencyData[];
  EVENT: {
    urlbackgroundimg: string;
    incomingtitle: string;
    emergencynumbertitle: string;
    contacttitle: string;
    contact: string;
    contactphone: string;
    contactplace: string;
    connectors: {
      strof: string;
      strto: string;
    },
    placeholder: {
      strName: string;
      strLastname: string;
      strMail: string;
      strMessage: string;
    },
    contactbuttontxt: string;
    latitude: number;
    longitude: number;
    socialnetworks: {
      strlinkedinurl: string;
      strlinkedinlogo: string;
      strfacebookurl: string;
      strfacebooklogo: string;
      stryoutubeurl: string;
      stryoutubelogo: string;
      strtwitterurl: string;
      strtwitterlogo: string;
    }
  }
}

export default NextEventModel;

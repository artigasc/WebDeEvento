
class EmergencyData {
  title: string;
  number: string;
  numbertext: string;
}

class EmergencyInfoModel {
  "EVENT": {
    "urlbackgroundimg":  string;
    "incomingtitle": string;
    "emergencynumbertitle":  string;
    "contacttitle":  string;
    "contact":  string;
    "contactphone":  string;
    "contactplace": string;
    "connectors": {
      "strof": string;
      "strto":  string;
    },
    "placeholder": {
      "strName":  string;
      "strLastname": string;
      "strMail": string;
      "strMessage":  string;
    },
    "contactbuttontxt": string;
    "latitude": number,
    "longitude": number,
    "socialnetworks": {
      "strlinkedinurl": string;
      "strlinkedinlogo": string;
      "strfacebookurl": string;
      "strfacebooklogo": string;
      "stryoutubeurl": string;
      "stryoutubelogo": string;
      "strtwitterurl": string;
      "strtwitterlogo": string;
    }
  };
  Emergency: EmergencyData[]
}

export default EmergencyInfoModel;

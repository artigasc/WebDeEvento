
class NoteData {
  title: string;
  name: string;
  url: string;
  position: number
}

class PressNoteModel {
  objNoteInfo: {
    title: string;
    subtitle: string;
    description: string;
    detail: string;
    date: string;
    contacttext: string;
    area: string;
    place: string;
    email: string;
    phone: string;
    lauching: string;
    urllaunching: string;
    thematic: string;
    urlthematic: string;
  };
  EVENT: {
    urlbackgroundimg: string;
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
    };
}
  Notes: NoteData[];
}

export default PressNoteModel;

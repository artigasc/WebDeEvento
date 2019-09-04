import ThematicSessionModel from "./thematicsession.model";

class MasterData {
  firstname: string;
  secondname: string;
  instruction: string;
  position: string;
  company: number;
  urlphoto: string;
  description: string;
  charge: string;
}

class SponsorData {
  id: string;
  urllogo: string;
  urlpage: string;
  position: string;
}


class HomeModel {
  EVENT: {
    title: string;
    description: string;
    place: string;
    slogan: string;
    latitude: string;
    longitude: string;
    datebegin: string;
    dateend: string;
    organized: string;
    program: string;
    dateStr: string;
    aditionalinfo: string;
    hourStart: string;
    hourEnd: string;
    inscription: string;
    contactbuttontxt: string;
    contactbuttonurl: string;
    contacttitle: string;
    contactphone: string;
    contact: string;
    contactplace: string;
    subtitlemagistral: string;
    subtitlesession: string;
    urlimgcenter: string;
    subtitlesponsor: string;
    seesponsors: string;
    connectors: {
      strof: string;
      strto: string;
      strofthe: string;
      stroftheupp: string;
    }
    urlbackgroundimg: string;
    mainimg: string;
    placeholder: {
      strName: string;
      strLastname: string;
      strMail: string;
      strMessage: string;
    }
  };
  Master: MasterData[];
  Sessions: ThematicSessionModel[];
  objSessionInfo: {
    title: string;
    description: string;
  }
  Sponsors: SponsorData[]
}

export default HomeModel;

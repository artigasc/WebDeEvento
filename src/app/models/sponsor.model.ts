class GroupsData {
  color: string;
  position: string;
  type: string;
  groupname: string;
  Sponsors: any[];
}
class SponsorData {
  id: string;
  urllogo: string;
  urlpage: string;
  position: string;
}

class SponsorsModel {
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
    latitude: string;
    longitude: string;
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
  };
  objSponsorsInfo: {
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phone: string
    opportunities: string;
    urlopportunities: string;
  };
  Groups: any[];
  Sponsors: SponsorData[];
}

export default SponsorsModel;



class OrganizationModel {
  contactbuttontxt: string;
  President: {
    id: string;
    name: string;
    lastname: string;
    commission: string;
    pictureurl: string;
  };
  Organization: OrgnizationData[];
  EVENT: {
    presidenttitle: string;
    presidentsubtitle: string;
    letters: string;
    contacttitle: string;
    contact: string;
    contactphone: string;
    latitude: number;
    longitude: number,
    contactplace: string;
    contactbuttontxt: string;
    urlbackgroundimg: string;
    placeholder: {
      strName: string;
      strLastname: string;
      strMail: string;
      strMessage: string;
    }
  }
}
class OrgnizationData {
  id: string;
  name: string;
  lastname: string;
  pictureurl: string;
  charge: string;
  Position: number;
}

export default OrganizationModel;

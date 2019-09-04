class standTypesData {
  Name: string;
  Color: string;
  Coin1:  string;
  Price1: number;
  Text1:  string;
  date1:  string;
  Coin2:  string;
  Price2: number;
  Text2: string;
  date2: string;
}

class MapModel {
  EVENT: {
    urlbackgroundimg: string;
    contacttitle: string;
    contact: string;
    contactphone: string;
    latitude: string;
    longitude: string;
    contactplace: string;
    placeholder: {
      strName: string;
      strLastname: string;
      strMail: string;
      strMessage: string;
    },
    contactbuttontxt: string;
  };
  objMapInfo: {
    pdfurl: string;
    title: string;
    subtitle: string;
    description: string;
    urlpicture: string
    urltexte: string;
    url: string;
    reglament: string;
    urlreglament: string
    reserve: string
    urlreserve: string
    legend: string;
    pdfurltext: string;
  };

  objFeatures: {
    Title: string;
    Title2: string;
    Area: string;
    AreaText: string;
    Dimensions: string;
    DimensionsText: string;
    Color: string;
    ColorText: string;
    Floor: string;
    FloorText: string;
    Electric: string;
    ElectricText: string;
    Illumination: string;
    IlluminationText: string;
    furniture: string;
    furnitureText: string;
  };
  objBenefits: {
    title: string;
    Description: string;
    Array: any[];
  };
  StandPrices: standTypesData[]
}

export default MapModel;

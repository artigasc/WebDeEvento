class standPricesData {
  Name: string;
  Color: string;
  Coin1: string;
  Price1: string;
  Text1: string;
  date1: string;
  Coin2:string;
  Price2: number;
  Text2: string;
  date2: string;
}

class CharacteristicsModel {
  objFeatures: {
    Title: string;
    Title2: string;
    Area: string;
    AreaText: string
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
    date1Str: string;
    date2Str: string;
  };
  StandPrices: standPricesData
}

export default CharacteristicsModel;

import MenuModel from "./models/menu.model";

export namespace Global {
  //export var apiurl: string = 'http://localhost:3000/api';
  export var apiurl: string = 'https://iimpservice.azurewebsites.net/api';
  export var culquiurl: string = 'https://api.culqi.com/v2/tokens';

  export var directoryUrl: string = '../assets/images/directory/';
  export var exhibitorsUrl: string = '../assets/images/speaker/';
  export var sponsorsUrl: string = '../assets/images/sponsors/';
  

  export var culturization:string = "es";
  export var responseOk: number = 200;
  export var maxLengthDNI: number = 8;
  export var maxLengthNotDNI: number = 15;
  export var maxLengthRUC: number = 11;
  export var idEvent: string = "0aa9ed40-b0c7-11e8-8b99-69bdc9a7fc8e";
  export var platform: string = "web";
  export var sourceIdToken: string = "pk_test_1n5LwCY6MClb3emO";//pk_test_1n5LwCY6MClb3emO


}

export namespace Views {
  export var presidentCard: string = "PresidentLetterView";
  export var organizationList: string = "Presidentcard";//w
  export var inscriptionView: string = "Activity";
  export var exhibitorsView: string = "ConferencistsView";
  export var coursesView: string = "Activity";
  export var fieldTripView: string = "Activity";
  export var thematicSessionsView: string = "ThematicSessionsView";
  export var mainMenuView: string = "Home";//w
  export var mapView: string = "Plane";
  export var characteristicsView: string = "CharacteristicsView";
  export var pricesView: string = "PricesView";
  export var sponsorView: string = "Sponsor";
  export var pressView: string = "Press";
  export var nextEventsView: string = "Information"; 
  export var emergencyNumbersView: string = "EmergencyNumbersView";
  export var reservationView: string = "Reservationform";
}


export class Helper {

  static GetNameMonth(lang, month) {
    const monthNamesEng = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthNamesSpa = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Dicembre"
    ];
    const d = new Date();
    if (lang == "es") {
      return monthNamesSpa[month];
    } else if (lang == "en") {
      return monthNamesEng[month];
    }
  }
   static  menuGlobal: MenuModel[] = [];
}


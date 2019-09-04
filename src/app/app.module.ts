import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './components/layout/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MenuComponent } from './components/menu/menu.component';
import { PresidentCardComponent } from './components/presidentcard/presidentcard.component';
import { HomeComponent } from './components/home/home.component';
import { ProgramComponent } from './components/program/program.component';
import { ExhibitionComponent } from './components/exhibition/exhibition.component';
import { ExhibitionDetailsComponent } from './components/exhibition/exhibitiondetails/exhibitiondetails.component';
import { SponsorComponent } from './components/sponsor/sponsor.component';
import { StrategicSponsorComponent } from './components/sponsor/strategicsponsor/strategicsponsors.component';
import { PressNewComponent } from './components/press/pressnew.component';
import { PressInterviewComponent } from './components/press/pressinterview/pressinterview.component';
import { MediaPartnerComponent } from './components/press/mediapartner/mediapartner.component'; 
import { MagazineComponent } from './components/press/magazine/magazine.component'; 
import { UpcomingEventComponent } from './components/information/upcomingevent.component';
import { EmergencyInfoComponent } from './components/information/emergencyinfo/emergencyinfo.component';
import { CourseComponent } from './components/program/course/course.component';
import { TravelComponent } from './components/program/travel/travel.component';
import { RouterModule, Routes } from '@angular/router';
import { EventService } from './services/event.service';
import { HubService } from './services/hub.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ContactComponent } from './components/contact/contact.component';
import { ExhibitorComponent } from './components/exhibitor/exhibitor.component';
import { ThematicSessionComponent } from './components/thematicsession/thematicsession.component';
import { OganizingCommitteeComponent } from './components/organizingcommittee/organizingcommittee.component';
import { LocationComponent } from './components/location/location.component';
import { BenefitComponent } from './components/exhibition/benefits/benefit.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { BrowserXhr } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { LoginComponent } from '../app/admin/components/login/login.component';

const appRoutes: Routes = [
  {
    path: '', component: MenuComponent,
    children: [
      { path: 'presidentcard', component: PresidentCardComponent },
      { path: '', component: HomeComponent },
      { path: 'register', component: ProgramComponent },
      { path: 'exhibition', component: ExhibitionComponent },
      { path: 'price', component: ExhibitionDetailsComponent },
      { path: 'sponsors', component: SponsorComponent },
      { path: 'strategicsponsors', component: StrategicSponsorComponent },
      { path: 'pressnews', component: PressNewComponent },
      { path: 'pressinterview', component: PressInterviewComponent },
      { path: 'mediapartner', component: MediaPartnerComponent },
      { path: 'magazine', component: MagazineComponent },
      { path: 'upcomingevents', component: UpcomingEventComponent },
      { path: 'emergencyinfo', component: EmergencyInfoComponent },
      { path: 'courses', component: CourseComponent },
      { path: 'travels', component: TravelComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'exhibitor', component: ExhibitorComponent },
      { path: 'thematicsession', component: ThematicSessionComponent },
      { path: 'oganizingcommittee', component: OganizingCommitteeComponent },
      { path: 'location', component: LocationComponent },
      { path: 'benefit', component: BenefitComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'reservation', component: ReservationComponent }
    ]
  },
  { path: 'admin', component: LoginComponent }
   
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PresidentCardComponent,
    HomeComponent,
    ProgramComponent,
    ExhibitionComponent,
    ExhibitionDetailsComponent,
    SponsorComponent,
    StrategicSponsorComponent,
    PressNewComponent,
    PressInterviewComponent,
    MediaPartnerComponent,
    MagazineComponent,
    UpcomingEventComponent,
    EmergencyInfoComponent,
    CourseComponent,
    TravelComponent,
    ContactComponent,
    ExhibitorComponent,
    ThematicSessionComponent,
    OganizingCommitteeComponent,
    LocationComponent,
    BenefitComponent,
    ReservationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    RouterModule.forChild(appRoutes),
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule.forRoot(),
  ],
  
  exports: [
    RouterModule
  ],
  providers: [
    EventService,
    HubService,
    CookieService
  ],
  //schemas: [
  //  CUSTOM_ELEMENTS_SCHEMA,
  //  NO_ERRORS_SCHEMA
  //],
  bootstrap: [AppComponent]
})
export class AppModule { }

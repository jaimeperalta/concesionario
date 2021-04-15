import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import firebase from 'firebase';
import { CreteClientComponent } from './components/crete-client/crete-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyDxwmskHrbB6juPK36A0rVJFubMYm2_Keo",
  authDomain: "conseccionario.firebaseapp.com",
  projectId: "conseccionario",
  storageBucket: "conseccionario.appspot.com",
  messagingSenderId: "362646648490",
  appId: "1:362646648490:web:75bb4a5f446d20265b82d3"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent,CreteClientComponent],
  entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

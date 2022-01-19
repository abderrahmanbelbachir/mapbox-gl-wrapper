import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatRippleModule} from "@angular/material/core";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {MapEffects} from "./MapState/map.effects";
import {mapReducer} from "./MapState/map.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatRippleModule,
    StoreModule.forRoot({map: mapReducer}, {}),
    EffectsModule.forRoot([MapEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

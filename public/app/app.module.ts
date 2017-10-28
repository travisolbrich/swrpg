import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from "@angular/forms";

import { AppComponent }  from './app.component';
import {CurrencyComponent} from "./currency.component";
import {routing} from "./app.routing";
import {UploadComponent} from "./upload.component";
import {LatestRaceComponent} from "./latestRace.component";
import {RacesComponent} from "./races.component";
import {SingleRaceComponent} from "./singleRace.component";
import {DriversComponent} from "./drivers.component";
import {DriverComponent} from "./driver.component";
import {StandingsComponent} from "./standings.component";
import {BonusComponent} from "./bonus.component";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule
    ],
    declarations: [
        AppComponent,
        CurrencyComponent,
        UploadComponent,
        LatestRaceComponent,
        RacesComponent,
        SingleRaceComponent,
        DriversComponent,
        DriverComponent,
        StandingsComponent,
        BonusComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

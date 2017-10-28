import {Component} from "@angular/core";
import {Driver, apiURL} from "./myClasses";
import {DriverService} from "./drivers.service";
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'bonus',
    templateUrl: 'bonus.component.html',
    styleUrls: ['bonus.component.css'],
    providers: [DriverService]
})
export class BonusComponent {
    apiUrl = new apiURL().getApiUrl();

    drivers:Driver[];
    message:string;
    driverId:number;
    reason:string;
    currencyAdj:number;
    newDriverId:number;
    newDriverName:string;
    newDriverMessage:string;

    constructor(private driverService:DriverService, private http:Http) {
        this.driverService.getAllDrivers().subscribe(drivers => {
            this.drivers = drivers;
        });
    }

    submitBonus() {
        let insertUrl = this.apiUrl + "insert/bonus/" +
            this.driverId + "/" +
            this.reason + "/" +
            this.currencyAdj;

        insertUrl = insertUrl.replace(/ /g, '_');

        this.http.get(insertUrl).subscribe(x => console.log(x));

        this.message = this.driverId + " | $" + this.currencyAdj + " for " + this.reason + " added.";
    }

    submitNewDriver() {
        let insertUrl = this.apiUrl + "insert/newDriver/" +
            this.newDriverId + "/" +
            this.newDriverName;

        insertUrl = insertUrl.replace(/ /g, '_');

        this.http.get(insertUrl).subscribe(x => console.log(x));

        this.newDriverMessage = this.newDriverName + " added.";
    }
}
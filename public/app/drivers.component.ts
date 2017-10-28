import {Component} from "@angular/core";
import {Driver} from "./myClasses";
import {DriverService} from "./drivers.service";


@Component({
    moduleId: module.id,
    selector: 'driver',
    templateUrl: 'drivers.component.html',
    providers: [DriverService]
})
export class DriversComponent {
    drivers: Driver[];

    constructor(private driverService:DriverService) {
        this.driverService.getAllDrivers().subscribe(drivers => {
            this.drivers = drivers;
        });
    }
}
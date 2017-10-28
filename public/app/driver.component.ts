import {Component, OnInit, OnDestroy} from "@angular/core";
import {Currency} from "./myClasses";
import {ActivatedRoute} from "@angular/router";
import {DriverService} from "./drivers.service";


@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'driver.component.html',
    providers: [DriverService]

})
export class DriverComponent implements OnInit, OnDestroy {
    currencies: Currency[];
    private sub: any;
    driverId: number;
    driverName: string;
    total: number = 0;

    constructor(private route: ActivatedRoute, private driverService: DriverService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.driverId = +params['driverId'];
        });

        this.driverService.getOneDriver(this.driverId).subscribe(results => {
            this.currencies = results;
            this.driverName = this.currencies[0].driverName;

            this.getTotal();
        });
    }


    getTotal() {
        for (let i = 0; i < this.currencies.length; i++) {
            this.total += this.currencies[i].currencyAdjustment;
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {apiURL} from "./myClasses";

@Injectable()
export class DriverService {
    constructor (private http: Http) {}

    private apiUrl:string = new apiURL().getApiUrl();

    getAllDrivers() {
        return this.http.get(this.apiUrl + "drivers")
            .map(res => res.json());
    }

    getOneDriver(_driverId) {
        return this.http.get(this.apiUrl + "currency/" + _driverId)
            .map(res => res.json());
    }
}
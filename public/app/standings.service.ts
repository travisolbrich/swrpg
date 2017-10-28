import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {apiURL} from "./myClasses";

@Injectable()
export class StandingsService {
    constructor (private http: Http) {}

    private apiUrl:string = new apiURL().getApiUrl();

    getCurrentStandings() {
        return this.http.get(this.apiUrl + "currentStandings")
            .map(res => res.json());
    }

    getOneDriver(_driverId) {
        return this.http.get(this.apiUrl + "driver/" + _driverId)
            .map(res => res.json());
    }
}
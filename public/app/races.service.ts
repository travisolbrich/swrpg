import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {apiURL} from "./myClasses";

@Injectable()
export class RacesService {
    constructor (private http: Http) {}

    private apiUrl:string = new apiURL().getApiUrl();

    getOneRace(_sessionId) {
        return this.http.get(this.apiUrl + "result/" + _sessionId)
            .map(res => res.json());
    }

    getLatestRace() {
        return this.http.get(this.apiUrl + "session/latest")
            .map(res => res.json());
    }

    getAllRaces() {
        return this.http.get(this.apiUrl + 'sessions')
            .map(res => res.json());
    }
}
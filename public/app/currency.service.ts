import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {apiURL} from "./myClasses";

@Injectable()
export class CurrencyService {
    constructor (private http: Http) {}

    private apiUrl:string = new apiURL().getApiUrl();

    getCurrencies() {
        return this.http.get(this.apiUrl + "currency")
            .map(res => res.json());
    }
}
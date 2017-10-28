import {Component, enableProdMode} from '@angular/core';
import {apiURL, User} from "./myClasses";
import {AuthService} from "./auth.service";

let isDevMode:boolean = new apiURL().isDevBuild;

if (!isDevMode) {
    enableProdMode();
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [],
    providers: [AuthService]
})
export class AppComponent  {
    userLoggedIn: boolean;
    userProfile: User;
    userEmail: string;
    userPower: number;

    constructor(private auth: AuthService) {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        if (this.userProfile === null) {
            this.userLoggedIn = false;
        } else {
            this.userLoggedIn = true;
            this.userEmail = this.userProfile.email;
            this.userPower = this.userProfile.power;
        }
    }

    login() {
        this.auth.login();
    }
    logout() {
        this.auth.logout();
    }
}

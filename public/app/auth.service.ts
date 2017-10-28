import {Injectable} from '@angular/core';

declare let Auth0Lock: any;

@Injectable()
export class AuthService {
    clientId: string = 'JeOz3MxDE44K8JPDHk1Jvz8TpGtxJORy';
    authDomain: string = 'jordanmalish.auth0.com';

    lock = new Auth0Lock(this.clientId, this.authDomain);

    login() {
        this.lock.show((error: string, profile: Object, id_token: string) => {
                if (error) {
                    console.log(error);
                } else {
                    localStorage.setItem('profile', JSON.stringify(profile));
                    localStorage.setItem('id_token', id_token);
                    location.reload();
                }
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        location.reload();
    }
}
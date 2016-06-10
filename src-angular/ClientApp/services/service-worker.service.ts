import {Injectable} from '@angular/core';

declare var navigator;

@Injectable()
export class ServiceWorkerService {
    _registration: any;
    _subcription: any;
    constructor() {
        
    }
    
    register() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                this._registration = registration;
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

            }).catch(function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    }

    subscribeToPN() {
        this._registration.pushManager.subscribe({ userVisibleOnly: true }).
            then((pushSubscription) => {
                this._subcription = pushSubscription;
                console.log('Subscribed! Endpoint:', this._subcription.endpoint);
                localStorage.setItem('subscription-endpoint', this._subcription.endpoint);
        });
}
    unsubscribeFromPN() {
        this._subcription.unsubscribe().then((event) => {
            console.log('Unsubscribed!', event);
        }).catch(function (error) {
            console.log('Error unsubscribing', error);
        });
    }
}
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Http, Headers, RequestOptionsArgs } from '@angular/http';
import { ServiceWorkerService } from '../../services/service-worker.service';

@Component({
    selector: 'push-notification',
    template: require('./push-notification.component.html')
})
export class PushNotificationComponent implements OnInit {

    subscribiption: boolean = false;
    message: string;

    constructor(private _http: Http,
        private serviceWorkerService: ServiceWorkerService ) {
    }

    ngOnInit() {
    }

    sendPushNotification() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'key=AIzaSyA8GiGFO9sn0Bu0M4nh-IpcCVnSXb-v5zs');
        var subscriptionEndpointArray = localStorage.getItem('subscription-endpoint').split('/');
        if (subscriptionEndpointArray.length == 6) {
            var data = {
                "registration_ids": [subscriptionEndpointArray[5]],
                "data": {
                    "Hello": this.message
                }
            }
            var result = this._http.post("https://android.googleapis.com/gcm/send",
                JSON.stringify(data), { headers: headers })
                .map((r) => r.json())
                .subscribe((result) => {

                });
        }

        
    }

    changeSubscription(event) {
        this.subscribiption = !this.subscribiption;
        if (this.subscribiption) {
            this.serviceWorkerService.subscribeToPN();
        }
        else {
            this.serviceWorkerService.unsubscribeFromPN();
        }
    }
}
import * as ng from '@angular/core';
import * as router from '@angular/router-deprecated';
import { Http, HTTP_BINDINGS } from '@angular/http';
import { NavMenu } from '../nav-menu/nav-menu';
import { Home } from '../home/home';
import { BuiltWithComponent } from '../../components/built-with/built-with.component';
import { BuiltWithFormComponent } from '../../components/built-with-form/built-with-form.component';
import { PushNotificationComponent } from '../../components/push-notification/push-notification.component';
import {EnvConstants} from '../../constants/environments.constant';
import { HttpCRUDService } from '../../services/http-crud.service';
import { ServiceWorkerService } from '../../services/service-worker.service';
import 'rxjs/add/operator/map';

@ng.Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [NavMenu, router.ROUTER_DIRECTIVES],
    providers: [
        EnvConstants,
        HttpCRUDService,
        ServiceWorkerService
    ]
})
@router.RouteConfig([
    { path: '/', component: Home, name: 'Home' },
    { path: '/built-with', component: BuiltWithComponent, name: 'BuiltWith' },
    { path: '/built-with-form/:id', name: 'BuiltWithForm', component: BuiltWithFormComponent },
    { path: '/push-notification', component: PushNotificationComponent, name: 'PushNotification' }
])
export class App implements ng.OnInit {
    constructor() {
        
    }

    ngOnInit() {
        
    }
}

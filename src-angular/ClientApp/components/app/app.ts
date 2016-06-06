import * as ng from '@angular/core';
import * as router from '@angular/router-deprecated';
import { Http, HTTP_BINDINGS } from '@angular/http';
import { NavMenu } from '../nav-menu/nav-menu';
import { Home } from '../home/home';
import { FetchData } from '../fetch-data/fetch-data';
import { Counter } from '../counter/counter';
import { AccountTypeComponent } from '../../components.setup/account-type/account-type.component';
import { AccountTypeFormComponent } from '../../components.setup/account-type-form/account-type-form.component';
import {EnvConstants} from '../../constants/environments.constant';
import { HttpCRUDService } from '../../services/http-crud.service';
import 'rxjs/add/operator/map';

@ng.Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [NavMenu, router.ROUTER_DIRECTIVES],
    providers: [
        EnvConstants,
        HttpCRUDService
    ]
})
@router.RouteConfig([
    { path: '/', component: Home, name: 'Home' },
    { path: '/counter', component: Counter, name: 'Counter' },
    { path: '/fetch-data', component: FetchData, name: 'FetchData' },
    { path: '/account-type', component: AccountTypeComponent, name: 'AccountType' },
    { path: '/account-type-form/:id', name: 'AccountTypeForm', component: AccountTypeFormComponent }
])
export class App {
}

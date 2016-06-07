import * as ng from '@angular/core';
import * as router from '@angular/router-deprecated';
import { Http, HTTP_BINDINGS } from '@angular/http';
import { NavMenu } from '../nav-menu/nav-menu';
import { Home } from '../home/home';
import { FetchData } from '../fetch-data/fetch-data';
import { Counter } from '../counter/counter';
import { BuiltWithComponent } from '../../components/built-with/built-with.component';
import { BuiltWithFormComponent } from '../../components/built-with-form/built-with-form.component';
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
    { path: '/built-with', component: BuiltWithComponent, name: 'BuiltWith' },
    { path: '/built-with-form/:id', name: 'BuiltWithForm', component: BuiltWithFormComponent }
])
export class App {
}

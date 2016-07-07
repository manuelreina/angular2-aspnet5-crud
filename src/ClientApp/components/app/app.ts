

import * as ng from '@angular/core';
import * as router from '@angular/router-deprecated';
import { Http, HTTP_BINDINGS } from '@angular/http';
import { HttpCRUDService } from '../../services/http-crud.service';
import { EnvConstants } from '../../constants/environments.constant';
import { NavMenu } from '../nav-menu/nav-menu';
import { Home } from '../home/home';
import { stateAndDispatcher, initState } from '../../redux.ts'
import { BuiltWithListComponent } from '../../components/built-with-list/built-with-list.component';
import { BuiltWithAddComponent } from '../../components/built-with-add/built-with-add.component';
import { BuiltWithUpdateComponent } from '../../components/built-with-update/built-with-update.component';

@ng.Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [NavMenu, router.ROUTER_DIRECTIVES],
    providers: [stateAndDispatcher, HttpCRUDService, EnvConstants]
})
@router.RouteConfig([
    { path: '/', component: Home, name: 'Home' },
    { path: '/built-with-list', component: BuiltWithListComponent, name: 'BuiltWithList' },
    { path: '/built-with-add', component: BuiltWithAddComponent, name: 'BuiltWithAdd' },
    { path: '/built-with-update', component: BuiltWithUpdateComponent, name: 'BuiltWithUpdate' }
])
export class App {
}

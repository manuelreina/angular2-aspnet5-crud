import { EnvConstants } from '../../constants/environments.constant';
import { Component, Inject, OnInit } from '@angular/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import * as redux from '../../redux.ts'
import {Observer, Observable} from 'rxjs';
import { IBuiltWithItem } from '../built-with-item/built-with-item.component'
import { HttpCRUDService } from '../../services/http-crud.service';

@Component({
    selector: 'built-with-update',
    template: require('./built-with-update.component.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class BuiltWithUpdateComponent implements OnInit {

    builtWith: IBuiltWithItem;

    constructor( @Inject(redux.dispatcher) private dispatcher: Observer<redux.Action>,
        private httpCRUDService: HttpCRUDService<IBuiltWithItem>,
        private envConstants: EnvConstants,
        private router: Router,
        private routeParams: RouteParams) {
        
    }

    ngOnInit() {
        this.builtWith = {
            name: '',
            pending: false,
            id: 0
        };
        debugger;
        let id = +this.routeParams.get('id');
        this.httpCRUDService.get(this.envConstants.apiEndPoint + 'crud', id)
            .subscribe((result) => {
                this.builtWith = result;
            });

    }

    updateBuiltWith() {
        this.httpCRUDService
            .update(this.envConstants.apiEndPoint + 'crud', this.builtWith)
            .subscribe(r => {
                //debugger;
                this.dispatcher.next(new redux.UpdateBuiltWithAction(r.id, this.builtWith.name, this.builtWith.pending));
            });
        this.router.navigate(['BuiltWithList']);
    }
    
}
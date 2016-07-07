import { EnvConstants } from '../../constants/environments.constant';
import { Component, Inject, OnInit } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import * as redux from '../../redux.ts'
import {Observer, Observable} from 'rxjs';
import { IBuiltWithItem } from '../built-with-item/built-with-item.component'
import { HttpCRUDService } from '../../services/http-crud.service';

@Component({
    selector: 'built-with-add',
    template: require('./built-with-add.component.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class BuiltWithAddComponent implements OnInit {

    builtWith: IBuiltWithItem;

    constructor( @Inject(redux.dispatcher) private dispatcher: Observer<redux.Action>,
        private httpCRUDService: HttpCRUDService<IBuiltWithItem>,
        private envConstants: EnvConstants,
        private router: Router) {
        
    }

    ngOnInit() {

        this.builtWith = {
            name: '',
            pending: false,
            id: 0
        };

    }

    addBuiltWith() {
        this.httpCRUDService
            .insert(this.envConstants.apiEndPoint + 'crud', this.builtWith)
            .subscribe(r => {
                //debugger;
                this.dispatcher.next(new redux.AddBuilthWithAction(r.id, this.builtWith.name, this.builtWith.pending));
            });
        this.router.navigate(['BuiltWithList']);
    }
    
}
import * as redux from '../../redux.ts'
import { Component, Inject, OnInit } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { initState, Action, AppState, state, dispatcher } from '../../redux.ts'
import {Observer, Observable} from 'rxjs';
import { HttpCRUDService } from '../../services/http-crud.service';
import { IBuiltWithItem, BuiltWithItemComponent } from '../built-with-item/built-with-item.component'
import { EnvConstants } from '../../constants/environments.constant';

@Component({
    selector: 'built-with-list',
    template: require('./built-with-list.component.html'),
    directives: [ROUTER_DIRECTIVES, BuiltWithItemComponent]
})
export class BuiltWithListComponent implements OnInit {
    
    constructor( @Inject(initState) private init: Observer<Action>,
        @Inject(state) private state: Observable<AppState>,
        private httpCRUDService: HttpCRUDService<IBuiltWithItem>,
        private envConstants: EnvConstants,
        @Inject(dispatcher) private dispatcher: Observer<Action>
        ) {

        
    }

    ngOnInit() {
        this.httpCRUDService.getAll(this.envConstants.apiEndPoint + 'crud')
            .subscribe(result => {
                this.dispatcher.next(new redux.GetBuiltWithListAction(result));
            });
    }

    get builtWithList() {
        return this.state.map(s => s.builtWithList);
    }
    //get builtWithList() { return []; }
    //emitToggle(id) { this.dispatcher.next(new ToggleTodoAction(id)); }
    
}
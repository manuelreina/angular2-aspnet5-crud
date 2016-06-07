import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpCRUDService } from '../../services/http-crud.service';
import { EnvConstants } from '../../constants/environments.constant';
import { CanDeactivate, RouteParams, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { Subscription } from 'rxjs/Rx';
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from '@angular/common';

@Component({
    selector: 'built-with-form',
    template: require('./built-with-form.component.html'),
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
export class BuiltWithFormComponent implements OnDestroy, OnInit {
    private _subscription: Subscription;
    builtWith: IBuiltWith;
    builtWithForm: ControlGroup;
    constructor(private httpCRUDService: HttpCRUDService<IBuiltWith>,
        private routeParams: RouteParams,
        private fb: FormBuilder,
        private router: Router,
        private envConstants: EnvConstants) {
        this.builtWithForm = fb.group({
            'name': ['', Validators.required]
        });

        httpCRUDService.setREST(envConstants.apiEndPoint + 'crud');
    }
    accountTypes: IBuiltWith[];

    ngOnInit() {
        
        var formMode = this.routeParams.get('formMode'); 
        if (formMode == 'edit') {
            if (!this.builtWith) {
                let id = +this.routeParams.get('id');
                this._subscription = this.httpCRUDService.get(id)
                    .subscribe((result) => {
                        this.builtWith = result;
                    });
            }
        }
        else {
            this.builtWith = {
                name: '',
                pending: false,
                id: 0
            };
        }
        
    }

    ngOnDestroy() {
        //this._subscription.unsubscribe();
    }

    submit(): void {
        var formMode = this.routeParams.get('formMode');
        if (formMode == 'edit') { 
            this.httpCRUDService
                .update(this.builtWith)
                .subscribe(r => {
                    this.builtWith = r;
                    this.router.navigate(['BuiltWith', {}]);
                });
        }
        else {
            this.httpCRUDService
                .insert(this.builtWith)
                .subscribe(r => {
                    this.builtWith = r;
                    this.router.navigate(['BuiltWith', {}]);
                });
        }

    }

    back(): void {
        //this.router.navigate(['AccountType']);
        //this.location.back();
    }
    
}
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpCRUDService } from '../../services/http-crud.service';
import { EnvConstants } from '../../constants/environments.constant';
import { CanDeactivate, RouteParams, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { Subscription } from 'rxjs/Rx';
import { NgForm }    from '@angular/common';


@Component({
    selector: 'built-with-form',
    template: require('./built-with-form.component.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class BuiltWithFormComponent implements OnDestroy, OnInit {
    private _subscription: Subscription;
    builtWith: IBuiltWith;
    formTitle: string;
    constructor(private httpCRUDService: HttpCRUDService<IBuiltWith>,
        private routeParams: RouteParams,
        private router: Router,
        private envConstants: EnvConstants) {
        
    }

    ngOnInit() {
        
        var formMode = this.routeParams.get('formMode'); 
        if (formMode == 'edit') {
            this.formTitle = "Edit";
            if (!this.builtWith) {
                let id = +this.routeParams.get('id');
                this._subscription = this.httpCRUDService.get(this.envConstants.apiEndPoint + 'crud', id)
                    .subscribe((result) => {
                        this.builtWith = result;
                    });
            }
        }
        else {
            this.formTitle = "New";
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
                .update(this.envConstants.apiEndPoint + 'crud', this.builtWith)
                .subscribe(r => {
                    this.builtWith = r;
                    this.router.navigate(['BuiltWith', {}]);
                });
        }
        else {
            
            this.httpCRUDService
                .insert(this.envConstants.apiEndPoint + 'crud', this.builtWith)
                .subscribe(r => {
                    this.builtWith = r;
                    this.router.navigate(['BuiltWith', {}]);
                });
        }

    }
    
    
}
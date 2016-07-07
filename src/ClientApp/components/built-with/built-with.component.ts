import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'built-with',
    template: require('./built-with.component.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class BuiltWithComponent implements OnInit {
    
    constructor(
        
    ) {
        
    }

    addBuiltWith() {

    }

    ngOnInit() {
    }
    
}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router-deprecated';

export interface IBuiltWithItem {
    id: number;
    name: string;
    pending: boolean;
}

@Component({
    selector: 'built-with-item',
    template: require('./built-with-item.component.html'),
    directives: []
})
export class BuiltWithItemComponent implements OnInit, IBuiltWithItem {
    id: number;
    @Input() name: string;
    @Input() pending: boolean;

    constructor(
        
    ) {
        
    }

    

    ngOnInit() {
    }
    
}
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, OpaqueToken, provide, Inject, Input, Output, EventEmitter, enableProdMode} from '@angular/core';

import {Observer, Observable, Subject, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/zip';
import { IBuiltWithItem } from './components/built-with-item/built-with-item.component'


// -- helpers
function merge<T>(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return <T>obj3;
}


// -- state

export interface AppState { builtWithList: IBuiltWithItem[]; }


// -- actions
export class AddBuilthWithAction { constructor(public builtWithId: number, public name: string, public pending: boolean) { } }
export class GetBuiltWithListAction { constructor(public builtWithList: IBuiltWithItem[]) { } }
export class UpdateBuiltWithAction { constructor(public builtWithId: number, public name: string, public pending: boolean) { } }

export type Action = AddBuilthWithAction | UpdateBuiltWithAction | GetBuiltWithListAction; //| UpdateBuiltWithAction | SetVisibilityFilter;



// -- statefn
function builthWithFN(initState: IBuiltWithItem[], actions: Observable<Action>): Observable<IBuiltWithItem[]> {
    return actions.scan((state, action) => {
        //debugger;
        if (action instanceof AddBuilthWithAction) {
            const newBuiltWith: IBuiltWithItem = { id: action.builtWithId, name: action.name, pending: false };
            return [...state, newBuiltWith];
        }
        else if (action instanceof GetBuiltWithListAction) {

            return action.builtWithList;
        }
        else {
            return state.map(t => updateBuiltWith(t, action));
        }
    }, initState);
}

function updateBuiltWith(builtWith: IBuiltWithItem, action: Action): IBuiltWithItem {
    if (action instanceof UpdateBuiltWithAction) {
        // merge creates a new object using the properties of the passed in objects
        return (action.builtWithId !== builtWith.id) ? builtWith : merge<IBuiltWithItem>(builtWith, { id: builtWith.id, name: builtWith.name, peding: builtWith.pending });

    } else {
        return builtWith;
    }
}

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
    const combine = state => ({ builtWithList: state[0] });

    const appStateObs: Observable<AppState> =
        builthWithFN(initState.builtWithList, actions).
            zip(actions.scan((state, action) => { return state;}, initState)).
            map(combine);
    return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
}


// -- DI config
export const initState = "initState";
export const dispatcher = "dispatcher";
export const state = "state";

export const stateAndDispatcher = [
    { provide: initState, useValue: { builtWithList: [] } },
    { provide: dispatcher, useValue: new Subject<Action>(null) },
    { provide: state, useFactory: stateFn, deps: [initState, dispatcher] }
];
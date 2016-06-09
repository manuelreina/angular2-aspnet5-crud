import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpCRUDService<T> {
    constructor(private _http: Http
        //private _toastService: ToastService
    ) {
        
        //by default we set the contenty-type to application/json
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
    }
    _headers: Headers;


    setHeaders(headers: Headers): void {
        this._headers = headers;
    }
    

    getAll(url: string, options?: RequestOptionsArgs): Observable<T[]> {
        //this._spinnerService.show();
        var result = this._http.get(url)
            .map<T[]>((r) => r.json());
                
        return result;
    }

    get(url: string, id:number, options?: RequestOptionsArgs): Observable<T> {
        var result = this._http.get(`${url}/${id}`)
            .map<T>((r) => r.json());
        return result;
    }

    update(url: string, entity: any, options?: RequestOptionsArgs, toastMessage?: string): Observable<any> {
        //this._spinnerService.show();
        
        var result = this._http.put(url,
            JSON.stringify(entity),
            { headers: this._headers })
            .map<T>((r) => r.json());
        return result;
    }

    insert(url: string, entity: T, options?: RequestOptionsArgs, toastMessage?: string): Observable<T> {
        //this._spinnerService.show();
        var result = this._http.post(url,
            JSON.stringify(entity),
            { headers: this._headers })
            .map<T>((r) => r.json());
        return result;
    }

    delete(url: string, id: number, toastMessage?: string): Observable<T> {
        //this._spinnerService.show();
        var result = this._http.delete(`${url}/${id}`)
            .map<T>((r) => r.json());
        return result;
    }
}
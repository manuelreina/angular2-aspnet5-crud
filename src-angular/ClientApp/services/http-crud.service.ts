import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptionsArgs} from 'angular2/http';
import { Observable } from 'rxjs/Observable';

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
    _url: string;


    setHeaders(headers: Headers): void {
        this._headers = headers;
    }

    setREST(api: string, params?: string) {
        this._url = api;
        
    }

    checkREST(): void {
        
    }

    getAll(options?: RequestOptionsArgs): Observable<T[]> {
        //this._spinnerService.show();
        var result = this._http.get(this._url)
            .map<T[]>(r => r.json());
                
        return result;
    }

    get(id:number, options?: RequestOptionsArgs): Observable<T> {
        var result = this._http.get(`${this._url}/${id}`)
            .map<T>(r => r.json());
        return result;
    }

    update(entity: T, options?: RequestOptionsArgs, toastMessage?: string): Observable<T> {
        //this._spinnerService.show();
        
        var result = this._http.put(this._url,
            JSON.stringify(entity),
            { headers: this._headers })
            .map<T>(r => r.json())
            .finally(() => {
                //_this._spinnerService.hide();
                var message = toastMessage ? toastMessage : "Updated successfully";
            });
        return result;
    }

    insert(entity: T, options?: RequestOptionsArgs, toastMessage?: string): Observable<T> {
        //this._spinnerService.show();
        var result = this._http.post(this._url,
            JSON.stringify(entity),
            { headers: this._headers })
            .map<T>(r => r.json());
        return result;
    }

    delete(id: number, toastMessage?: string): Observable<T> {
        //this._spinnerService.show();
        var result = this._http.delete(`${this._url}/${id}`)
            .map<T>(r => r.json());
        return result;
    }
}
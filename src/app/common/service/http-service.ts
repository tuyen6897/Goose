import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private _url = 'https://ngong-3826.herokuapp.com';
    constructor(private _httpClient: HttpClient) {
    }

    reqeustApiPost(api: string, params: any) {
        let url = '';
        let header = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
        });
        if (api === 'login') {
            url = `${this._url}/login`;
        }
        if (api === 'regisAccount') {
            url = `${this._url}/register`;
        }

        if (api === 'products') {
            url = `${this._url}/products`;
        }

        if (api === 'carts') {
            url = `${this._url}/carts`;
        }

        return this._httpClient.post(url, params, { headers: header });
    }

    reqeustApiget(api: string, params: any = null) {
        let url = '';
        let header = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json'
        });

        switch (api) {
            case 'news':
                url = `${this._url}/news`;
                break;
            case 'productDetails':
                url = `${this._url}/products/${params}`;
                break;
            case 'product_categories':
                url = `${this._url}/product_categories`;
                break;
            case 'posts':
                url = `${this._url}/posts?menuCode=chuyen-ngong&pageIndex=1&pageSize=10`;
                break;
            default:
                break;
        }
        return this._httpClient.get(url, { headers: header, params: params }).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            console.log(error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
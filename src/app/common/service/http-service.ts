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
        switch (api) {
            case 'login':
                url = `${this._url}/login`;
                break;
            case 'regisAccount':
                url = `${this._url}/register`;
                break;
            case 'products':
                url = `${this._url}/products`;
                break;
            case 'carts':
                url = `${this._url}/carts`;
                break;
            case 'shippingFee':
                url = `${this._url}/utility/shippingFee`;
                break;
            case 'register-trip':
                url = `${this._url}/utility/register-trip`;
                break;
            case 'register-project':
                url = `${this._url}/utility/register-project`;
                break;
            case 'register-agent-ctv':
                url = `${this._url}/utility/register-agent-ctv`;
                break;
            default:
                break;
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
                url = `${this._url}/posts?${params}`;
                break;
            case 'topPost':
                url = `${this._url}/topPost?size=10`;
                break;
            case 'newest-sale':
                url = `${this._url}/products/newest-sale?${params}`;
                break;
            case 'projects':
                url = `${this._url}/utility/projects`;
                break;
            default:
                break;
        }
        return this._httpClient.get(url, { headers: header }).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            console.log(error);
        }
        const dialog: any = document.body.querySelector('#printLoadMask');
        dialog['style'].display = 'none';
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
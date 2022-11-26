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


    getJwttoken() {
        const account = JSON.parse(sessionStorage.getItem("account") as any);
        return account.jwttoken;
    }

    reqeustApiPost(api: string, params: any, isaccount: boolean = false) {
        let url = '';
        let header = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
        });
        if (isaccount) {
            header = new HttpHeaders({
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getJwttoken()}`
            });
        }
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
            case 'product-system':
                url = `${this._url}/utility/product-system`;
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
            case 'ask-question':
                url = `${this._url}/utility/ask-question`;
                break;
            case 'userupdate':
                url = `${this._url}/user/update`;
                break;
            case 'payment':
                url = `${this._url}/payment`;
                break;
            case 'paymentagain':
                url = `${this._url}/payment/again`;
                break;
            case 'paymentagain':
                url = `${this._url}/payment/again`;
                break;
            case 'comments':
                url = `${this._url}/comments`;
                break;
            case 'postsupdate':
                url = `${this._url}posts/update`;
                break;
            default:
                break;
        }
        return this._httpClient.post(url, params, { headers: header });
    }

    reqeustApiget(api: string, params: any = null, isaccount: boolean = false) {
        let url = '';
        let header = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json'
        });
        if (isaccount) {
            header = new HttpHeaders({
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getJwttoken()}`
            });
        }
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
            case 'footer':
                url = `${this._url}/posts/footer`;
                break;
            case 'posts':
                url = `${this._url}/posts?${params}`;
                break;
            case 'postsproject':
                url = `${this._url}/posts/project/${params}`;
                break;
            case 'brand-names':
                url = `${this._url}/products/brand-names/all`;
                break;
            case 'award':
                url = `${this._url}/utility/award`;
                break;
            case 'aboutNgong':
                url = `${this._url}/posts/aboutNgong`;
                break;
            case 'topPost':
                url = `${this._url}/posts/topPost?size=10&orderBy=1`;
                break;
            case 'newest-sale':
                url = `${this._url}/products/newest-sale/all?${params}`;
                break;
            case 'projects':
                url = `${this._url}/utility/projects?type=${params}`;
                break;
            case 'city':
                url = `${this._url}/utility/city`;
                break;
            case 'agent':
                url = `${this._url}/utility/agent/city`;
                break;
            case 'agentcity':
                url = `${this._url}/utility/agent?cityId=${params}`;
                break;
            case 'modeRegisterTrip':
                url = `${this._url}/utility/agent/modeRegisterTrip`;
                break;
            case 'contact':
                url = `${this._url}/utility/contact`;
                break;
            case 'banner':
                url = `${this._url}/utility/banner`;
                break;
            case 'rightBanner':
                url = `${this._url}/utility/rightBanner`;
                break;
            case 'bannerMiddlePage':
                url = `${this._url}/utility/bannerMiddlePage`;
                break;
            case 'imageSoGao':
                url = `${this._url}/utility/imageSoGao`;
                break;
            case 'partner':
                url = `${this._url}/utility/partner`;
                break;
            case 'tuyenDungNews':
                url = `${this._url}/posts/tuyenDungNews`;
                break;
            case 'best-seller':
                url = `${this._url}/products/best-seller`;
                break;
            case 'ship-price':
                url = `${this._url}/payment/ship-price?${params}`;
                break;
            case 'paymentlist':
                url = `${this._url}/payment/list`;
                break;
            case 'comments':
                url = `${this._url}/comments`;
                break;
            case 'sogaos':
                url = `${this._url}/sogaos`;
                break;
            case 'menu':
                url = `${this._url}/menu`;
                break;
            case 'notify':
                url = `${this._url}/account/notify`;
                break;
            case 'carts':
                url = `${this._url}/carts`;
                break;
            default:
                break;
        }
        return this._httpClient.get(url, { headers: header }).pipe(catchError(this.handleError));
    }

    reqeustApiput(api: string, params: any = null) {
        let url = '';
        let header = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getJwttoken()}`
        });
        switch (api) {
            case 'carts':
                url = `${this._url}/carts`;
                break;
            default:
                break;
        }
        return this._httpClient.put(url, params, { headers: header }).pipe(catchError(this.handleError));
    }

    reqeustApidelete(api: string, params: any = null) {
        let url = '';
        let header = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getJwttoken()}`
        });
        switch (api) {
            case 'carts':
                url = `${this._url}/carts`;
                break;
            default:
                break;
        }
        return this._httpClient.put(url, params, { headers: header }).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            console.log(error);
        }
        const dialog: any = document.querySelector('#printLoadMask');
        dialog['style'].display = 'none';
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
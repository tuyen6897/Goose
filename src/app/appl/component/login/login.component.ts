import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError } from 'rxjs';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ComponentBaseComponent implements OnInit {

    data: any;
    isLogin = false;
    isRecover = false;
    isHidenPassWord = false;
    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('accountLogin', { static: false }) accountLogin!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('address', { static: false }) address!: ElementRef;
    @ViewChild('passRegist', { static: false }) passRegist!: ElementRef;
    @ViewChild('passLogin', { static: false }) passLogin!: ElementRef;
    @ViewChild('message', { static: true }) message!: ElementRef;
    constructor(public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public httpService: HttpService,
        messageService2: MessageService,
        private rer: Renderer2) {
        super(messageService2);
    }
    ngOnInit() {
        this.data = this.config.data;
        this.isLogin = this.data.login;
    }

    onRigister() {
        this.showDialog('on');
        this.isLogin = false;
        this.httpService.reqeustApiPost('regisAccount', {
            "name": this.name.nativeElement.value,
            "phone": this.phone.nativeElement.value,
            "email": this.email.nativeElement.value,
            "password": this.passRegist.nativeElement.value,
            "address": this.address.nativeElement.value
        }).pipe(catchError(this.handleError)).subscribe((response: any) => {
            this.isLogin = true;
            this.name.nativeElement.value = '';
            this.phone.nativeElement.value = '';
            this.email.nativeElement.value = '';
            this.address.nativeElement.value = '';
            this.passRegist.nativeElement.value = '';
            this.message.nativeElement.innerText = '';
            this.showDialog('off');
            this.data.func('success', 'Success', 'Đăng ký thành công.');
        });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            let errorMessage: any = document.querySelector('.error-message');
            errorMessage['innerText'] = error.error.desc;
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    onLogin() {
        this.showDialog('on');
        this.httpService.reqeustApiPost('login', {
            "username": this.accountLogin.nativeElement.value,
            "password": this.passLogin.nativeElement.value
        }).pipe(catchError(this.handleError)).subscribe((response: any) => {
            const user = response.user;
            sessionStorage.setItem('account', JSON.stringify({
                'username': user.name,
                'phone': user.phone,
                'email': user.email,
            }));
            this.message.nativeElement.innerText = '';
            this.ref.close();
            this.data.func('success', '', 'Đăng nhập thành công.');
            this.showDialog('off');
        });
        this.isLogin = true;
    }

    togglePassword() {
        let input: any;
        input = this.isLogin ? this.passLogin.nativeElement : this.passRegist.nativeElement;
        if (input.attributes.type.textContent !== 'text') {
            this.rer.setAttribute(input, 'type', 'text');
            this.isHidenPassWord = true;
        } else {
            this.rer.setAttribute(input, 'type', 'password');

            this.isHidenPassWord = false;
        }
    }

    clearMessage() {
        this.message.nativeElement.innerText = '';
    }

}

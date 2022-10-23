import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-thanhtoan',
    templateUrl: './thanhtoan.component.html',
    styleUrls: ['./thanhtoan.component.scss'],
    providers: [DialogService, MessageService]
})
export class ThanhtoanComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('name', { static: true }) name!: ElementRef;
    @ViewChild('tel', { static: true }) tel!: ElementRef;
    @ViewChild('email', { static: true }) email!: ElementRef;
    voucher = '';
    checked = false;
    isCard = false;
    ismomo = false;
    iszalo = false;
    selectedCity1 = { name: '', code: '', districts: null };
    selectedCity2 = { name: '', code: '', wards: null };
    selectedCity3 = { name: '', code: '' };
    cities = [
        { name: 'Chọn tỉnh thành', code: '0', districts: null },
    ];

    district = [
        { name: 'Chọn Quận/Huyện', code: '0', wards: null },
    ];
    wards = [
        { name: 'Chọn Phường', code: '' },
    ]
    product: any;
    total = '';
    ship = '30,000';
    account: any = {
        username: '',
        email: '',
        phone: ''
    };
    ref!: DynamicDialogRef;
    constructor(private render: Renderer2, private router: Router, private http: HttpClient, private dialogService: DialogService
        , private messageService1: MessageService) {
        super(messageService1);
    }

    ngOnInit() {
        this.showDialog('on');
        const account = JSON.parse(sessionStorage.getItem("account") as any);
        if (account) {
            this.account = account;
        }
        if (account) {
            this.render.setAttribute(this.name.nativeElement, 'readonly', 'true');
            this.render.setAttribute(this.tel.nativeElement, 'readonly', 'true');
            this.render.setAttribute(this.email.nativeElement, 'readonly', 'true');
        } else {
            this.render.removeAttribute(this.name.nativeElement, 'readonly');
            this.render.removeAttribute(this.tel.nativeElement, 'readonly');
            this.render.removeAttribute(this.email.nativeElement, 'readonly');
        }
        console.log(this.account);
        const ecode = window.location.search.split('?code=')[1];;
        this.product = JSON.parse(sessionStorage.getItem(ecode) as any);
        if (this.product && this.product.length) {
            let totalNumber = 0;
            this.product.forEach((item: any) => {
                totalNumber += +(item.price) * item.quantity;
            });
            this.total = String(totalNumber);
        }
        this.http.get('https://provinces.open-api.vn/api/?depth=3').subscribe((datas: any) => {
            console.log(datas);
            datas.forEach((data: any) => {
                this.cities.push({ name: data.name, code: data.code, districts: data.districts });
                this.showDialog('off');
            });
        })
    }

    openDialogLogin(): void {
        this.ref = this.dialogService.open(LoginComponent, {
            width: '30%',
            contentStyle: { "height": "auto", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                login: true,
                func: this.onLogin.bind(this)
            }
        });
    }

    onLogin(severity: string = 'info', summary: string = 'Info', message: string = 'Message') {
        const account = JSON.parse(sessionStorage.getItem("account") as any);
        if (account) {
            this.account = account;
        }
        if (account) {
            this.render.setAttribute(this.name.nativeElement, 'readonly', 'true');
            this.render.setAttribute(this.tel.nativeElement, 'readonly', 'true');
            this.render.setAttribute(this.email.nativeElement, 'readonly', 'true');
        } else {
            this.render.removeAttribute(this.name.nativeElement, 'readonly');
            this.render.removeAttribute(this.tel.nativeElement, 'readonly');
            this.render.removeAttribute(this.email.nativeElement, 'readonly');
        }
        this.showMessage(severity, summary, message);
    }

    citiesChange(selectedCity1: any) {
        this.district = [
            { name: 'Chọn Quận/Huyện', code: '0', wards: null },
        ];
        this.wards = [
            { name: 'Chọn Phường', code: '' },
        ]
        selectedCity1.districts.forEach((data: any) => {
            this.district.push({ name: data.name, code: data.code, wards: data.wards });
        });
    }

    districtChange(selectedCity2: any) {
        this.wards = [
            { name: 'Chọn Phường', code: '' },
        ]
        selectedCity2.wards.forEach((data: any) => {
            this.wards.push({ name: data.name, code: data.code });
        });
    }


    cardCheck(event: any) {
        if (event.target.checked) {
            this.isCard = true;
        }
        this.ismomo = false;
        this.iszalo = false;
    }

    momoCheck(event: any) {
        if (event.target.checked) {
            this.ismomo = true;
        }
        this.iszalo = false;
        this.isCard = false;
    }

    zaloCheck(event: any) {
        if (event.target.checked) {
            this.iszalo = true;
        }
        this.ismomo = false;
        this.isCard = false;
    }

    formatCash(str: string) {
        str = String(str);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

}

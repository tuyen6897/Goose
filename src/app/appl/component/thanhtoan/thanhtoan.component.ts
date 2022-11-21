import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
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
    note: string = '';
    voucher = '';
    checked = false;
    isCard = false;
    ismomo = false;
    iszalo = false;
    selectedCity1 = { name: '', id: '', districtList: null };
    selectedCity2 = { name: '', id: '', wardList: null };
    selectedCity3 = { name: '', id: '' };
    cities = [
        { name: 'Chọn tỉnh thành', id: 0, districtList: null },
    ];

    district = [
        { name: 'Chọn Quận/Huyện', id: 0, wardList: null },
    ];
    wardList = [
        { name: 'Chọn Phường', id: 0 },
    ]
    product: any;
    total = '';
    shipPrice = 0;
    totalOrder = +(this.total) + this.shipPrice;
    account: any = {
        username: '',
        email: '',
        phone: '',
        address: ''
    };
    paymentMethodList: any[] = [];
    ref!: DynamicDialogRef;
    constructor(private render2: Renderer2, private router: Router, private httpService: HttpService, private dialogService: DialogService
        , private messageService1: MessageService) {
        super(messageService1, render2);
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        const account = JSON.parse(sessionStorage.getItem("account") as any);
        if (account) {
            this.account = account;
        }
        if (account) {
            this.render2.setAttribute(this.name.nativeElement, 'readonly', 'true');
            this.render2.setAttribute(this.tel.nativeElement, 'readonly', 'true');
            this.render2.setAttribute(this.email.nativeElement, 'readonly', 'true');
        } else {
            this.render2.removeAttribute(this.name.nativeElement, 'readonly');
            this.render2.removeAttribute(this.tel.nativeElement, 'readonly');
            this.render2.removeAttribute(this.email.nativeElement, 'readonly');
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
            this.totalOrder = +(this.total) + this.shipPrice;
        }
        this.httpService.reqeustApiget('city').subscribe((data: any) => {
            console.log(data.cityList);
            data.cityList.forEach((data: any) => {
                this.cities.push({ name: data.name, id: data.id, districtList: data.districtList });
                this.showLoadingDialog('off');
            });
        })

        this.httpService.reqeustApiget('paymentlist').subscribe((data: any) => {
            if (data.paymentMethodList) {
                this.paymentMethodList = data.paymentMethodList;
            }
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

    onPay() {
        if (this.checked) {

            let productList: any[] = [];
            this.product.forEach((item: any) => {
                productList.push({
                    "productCode": item.productCode,
                    "quantity": item.quantity,
                    "attribute": item.attribute,
                    "price": item.price,
                    "priceDiscount": item.totalPrice,
                    "gaoFlag": item.gaoFlag
                });
            });

            const params = {
                "Customer": {
                    "cusName": this.account.username,
                    "cusEmail": this.account.email,
                    "cusPhone": this.account.phone,
                    "cusCity": this.selectedCity1.id,
                    "cusDistrict": this.selectedCity2.id,
                    "cusWard": this.selectedCity3.id,
                    "cusNote": this.note
                },
                "productList": productList,
                "soGaoList": [
                    {
                        "productCode": "string",
                        "quantity": 0,
                        "attribute": {
                            "key": "string",
                            "name": "string",
                            "value": [
                                "string"
                            ]
                        },
                        "price": 0,
                        "priceDiscount": 0
                    }
                ],
                "promotionCode": "string",
                "paymentMethodId": "string",
                "originAmount": "string",
                "amountDiscount": "string",
                "shippingFee": String(this.shipPrice),
                "totalAmount": "string",
                "User": {
                    "id": this.account.id,
                    "name": this.account.username,
                    "phone": this.account.phone,
                    "email": this.account.email,
                    "address": this.account.address,
                    "password": "string",
                    "passwordPlainText": "string",
                    "actived": 0,
                    "createdDate": "2022-11-20T16:04:26.338Z"
                }
            }
        }
    }

    onLogin(severity: string = 'info', summary: string = 'Info', message: string = 'Message') {
        const account = JSON.parse(sessionStorage.getItem("account") as any);
        if (account) {
            this.account = account;
        }
        if (account) {
            this.render2.setAttribute(this.name.nativeElement, 'readonly', 'true');
            this.render2.setAttribute(this.tel.nativeElement, 'readonly', 'true');
            this.render2.setAttribute(this.email.nativeElement, 'readonly', 'true');
        } else {
            this.render2.removeAttribute(this.name.nativeElement, 'readonly');
            this.render2.removeAttribute(this.tel.nativeElement, 'readonly');
            this.render2.removeAttribute(this.email.nativeElement, 'readonly');
        }
        this.showMessage(severity, summary, message);
    }

    citiesChange(selectedCity1: any) {
        this.district = [
            { name: 'Chọn Quận/Huyện', id: 0, wardList: null },
        ];
        this.wardList = [
            { name: 'Chọn Phường', id: 0 },
        ]
        selectedCity1.districtList.forEach((data: any) => {
            this.district.push({ name: data.name, id: data.id, wardList: data.wardList });
        });
    }

    districtChange(selectedCity2: any) {
        this.wardList = [
            { name: 'Chọn Phường', id: 0 },
        ]
        selectedCity2.wardList.forEach((data: any) => {
            this.wardList.push({ name: data.name, id: data.id });
        });
    }

    wardListChange() {
        this.httpService.reqeustApiget('ship-price', `cityCode=${this.selectedCity1.id}&districtCode=${this.selectedCity2.id}&weight=10&totalPrice=${this.total}`).subscribe((data: any) => {
            this.shipPrice = data.shipPrice;
        })
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

    formatCash(value: number) {
        const str = String(value);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

}

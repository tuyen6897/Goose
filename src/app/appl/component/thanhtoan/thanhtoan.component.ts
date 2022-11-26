import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';
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
    isPayment = false;
    paymentId = 0;
    ecode: any = null;
    promotionCode: string = '';
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
        address: '',

    };
    paymentMethodList: any[] = [];
    paymentImage: any[] = [
        'https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=1',
        'https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1',
        'https://www.coolmate.me/images/momo-icon.png',
        'https://www.coolmate.me/images/logo-zalopay.svg'
    ]
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
        this.ecode = window.location.search.split('?code=')[1];
        this.product = JSON.parse(sessionStorage.getItem(this.ecode) as any);
        if (this.product && this.product.length) {
            let totalNumber = 0;
            this.product.forEach((item: any) => {
                totalNumber += +(item.price) * item.quantity;
            });
            this.total = String(totalNumber);
            this.totalOrder = +(this.total) + this.shipPrice;
        }
        this.httpService.reqeustApiget('city').subscribe((data: any) => {
            data.cityList.forEach((data: any) => {
                this.cities.push({ name: data.name, id: data.id, districtList: data.districtList });
                this.showLoadingDialog('off');
            });
        })

        this.httpService.reqeustApiget('paymentlist').subscribe((data: any) => {
            if (data.paymentMethodList) {
                this.paymentMethodList = data.paymentMethodList;
                for (let i = 0; i < this.paymentMethodList.length; i++) {
                    if (this.paymentMethodList[i].paymentType === 1) {
                        this.paymentMethodList[i].isShow = false;
                    }
                    this.paymentMethodList[i].imageUrl = this.paymentImage[i];
                }
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
        if (this.checked && this.isPayment) {
            let productList: any[] = [];
            let sogaoList: any[] = [];
            this.product.forEach((item: any) => {
                if (!item.gaoFlag) {
                    productList.push({
                        "productCode": item.id,
                        "productId": item.idVariant,
                        "quantity": item.quantity,
                        "price": item.price,
                        "priceDiscount": item.totalPrice,
                        "gaoFlag": item.gaoFlag
                    });
                } else {
                    sogaoList.push({
                        "productCode": item.id,
                        "productId": item.idVariant,
                        "quantity": item.quantity,
                        "price": item.price,
                        "priceDiscount": item.totalPrice
                    });
                }

            });

            // "remainGaoProductList": [
            //     {
            //         "amountFixRemainGao": "",
            //         "remainSizeGao": 0,
            //         "amountRemainGao": ""
            //     }
            // ],

            let params: any = {
                "Customer": {
                    "cusName": this.account.username,
                    "cusEmail": this.account.email,
                    "cusPhone": this.account.phone,
                    "cusCity": this.selectedCity1.name,
                    "cusDistrict": this.selectedCity2.name,
                    "cusWard": this.selectedCity3.name,
                    "cusNote": this.note
                },
                "promotionCode": this.promotionCode,
                "paymentMethodId": this.paymentId,
                "originAmount": this.total,
                "amountDiscount": 0,
                "shippingFee": this.shipPrice,
                "totalAmount": this.totalOrder
            };

            if (productList.length) {
                params['productList'] = productList;
            }
            if (sogaoList.length) {
                params['soGaoList'] = sogaoList;
            }
            const account = JSON.parse(sessionStorage.getItem("account") as any) ? true : false;
            // const params2 = {
            //     "customer": {
            //         "cusName": "tuyen2",
            //         "cusEmail": "tuyen2",
            //         "cusPhone": "02222222222",
            //         "cusCity": "Hà Nội",
            //         "cusDistrict": "Bắc Từ Liêm",
            //         "cusWard": "P. Cổ Nhuế 2",
            //         "cusNote": "Giao hàng cẩn thận giùm mình nha"
            //     },
            //     "productList": [
            //         {
            //             "productId": 1,
            //             "productCode": "SP000001",
            //             "quantity": 3,
            //             "size": 0,
            //             "price": 50000,
            //             "priceDiscount": 45000,
            //             "gaoFlag": 0
            //         }
            //     ],
            //     "promotionCode": "",
            //     "paymentMethodId": "1",
            //     "originAmount": 150000,
            //     "amountDiscount": 135000,
            //     "shippingFee": 30000,
            //     "totalAmount": 165000
            // };

            // const params2 = {
            //     "customer": {
            //         "cusName": "tuyen23",
            //         "cusEmail": "tuyen23",
            //         "cusPhone": "0485768457",
            //         "cusCity": "Hà Nội",
            //         "cusDistrict": "Bắc Từ Liêm",
            //         "cusWard": "P. Cổ Nhuế 2",
            //         "cusNote": "Giao hàng cẩn thận giùm mình nha"
            //     },
            //     "productList": [
            //         {
            //             "productId": 1,
            //             "productCode": "SP000001",
            //             "quantity": 3,
            //             "size": 0,
            //             "price": 50000,
            //             "priceDiscount": 45000,
            //             "gaoFlag": 0
            //         }
            //     ],
            //     "soGaoList": [
            //         {
            //             "productId": 9,
            //             "productCode": "SG60",
            //             "quantity": 1,
            //             "size": 60,
            //             "price": 3240000,
            //             "priceDiscount": 2520000
            //         }
            //     ],
            //     "promotionCode": "",
            //     "paymentMethodId": "1",
            //     "originAmount": 150000,
            //     "amountDiscount": 135000,
            //     "shippingFee": 30000,
            //     "totalAmount": 165000
            // };
            // console.log(params2);
            this.httpService.reqeustApiPost('payment', params, account).subscribe((data: any) => {
                this.showMessage('success', '', 'Đăng ký thành công.');
                sessionStorage.removeItem(this.ecode);
                sessionStorage.removeItem("productList");
                sessionStorage.setItem('projectListOrder', JSON.stringify({
                    'product': this.product,
                    'payment': params
                }));
                window.open(`${window.location.origin}/dat-hang`, "_self");
            });
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
            this.render2.removeAttribute(this.tel.nativeElement, 'readonly'); 5
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
        console.log(`cityCode=${this.selectedCity1.id}&districtCode=${this.selectedCity2.id}&weight=10&totalPrice=${this.total}`);
        this.httpService.reqeustApiget('ship-price', `cityCode=${this.selectedCity1.id}&districtCode=${this.selectedCity2.id}&weight=10&totalPrice=${this.total}`).subscribe((data: any) => {
            console.log(data);
            this.shipPrice = data.shipPrice;
            this.totalOrder -= this.shipPrice;
        })
    }

    cardCheck(item: any) {
        this.isPayment = true;
        this.paymentId = item.id;
        let paymentOther = this.paymentMethodList.filter(x => (x.id !== item.id && x.paymentType === 1));
        paymentOther.forEach(item => {
            item.isShow = false;
        });
        let payment = this.paymentMethodList.find(x => x.id === item.id);
        if (payment.paymentType === 1) {
            payment.isShow = !item.isShow;
        }
    }

    formatCash(value: number) {
        const str = String(value);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }


    createURL(name: string, id: string) {
        if (!name || !id) return '';
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-dathang',
    templateUrl: './dathang.component.html',
    styleUrls: ['./dathang.component.scss'],
    providers: [DialogService]
})
export class DathangComponent implements OnInit {

    paymentOrder: any;
    product: any[] = [];
    payment: any = null;
    paymentMethod: any = null;
    ref!: DynamicDialogRef;
    paymentImage: any[] = [
        'https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=1',
        'https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1',
        'https://www.coolmate.me/images/momo-icon.png',
        'https://www.coolmate.me/images/logo-zalopay.svg'
    ]
    constructor(private router: Router,
        private dialogService: DialogService, private httpService: HttpService) { }

    ngOnInit() {
        this.paymentOrder = JSON.parse(sessionStorage.getItem("projectListOrder") as any);
        this.product = this.paymentOrder.product;
        this.payment = this.paymentOrder.payment;
        this.httpService.reqeustApiget('paymentlist').subscribe((data: any) => {
            if (data.paymentMethodList) {
                for (let i = 0; i < data.paymentMethodList.length; i++) {
                    if (data.paymentMethodList[i].paymentType === 1) {
                        data.paymentMethodList[i].isShow = false;
                    }
                    data.paymentMethodList[i].imageUrl = this.paymentImage[i];
                }
                this.paymentMethod = data.paymentMethodList.find((x: any) => x.id = +(this.payment.paymentMethodId));
                console.log(this.paymentMethod);
            }
        })
    }

    formatCash(str: string) {
        str = String(str);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    openDialogLogin(login = false): void {
        this.router.navigate(['']);
        this.ref = this.dialogService.open(LoginComponent, {
            width: '30%',
            contentStyle: { "height": "auto", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                login: login
            }
        });
    }

    onBuyNow() {
        window.open(`${window.location.origin}/danh-muc-san-pham`, "_self");
    }

    createURL(name: string, id: string) {
        if (!name || !id) return '';
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }


}

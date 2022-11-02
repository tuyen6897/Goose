import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/util/utils';

@Component({
    selector: 'app-giohang',
    templateUrl: './giohang.component.html',
    styleUrls: ['./giohang.component.scss']
})
export class GiohangComponent implements OnInit {

    soluong = '';
    total = '';
    product: any;
    constructor(private router: Router) { }
    checked: boolean = true;
    itemCheck: boolean = true;
    quantity = 0;
    voucher = '';
    ngOnInit() {

        this.product = JSON.parse(sessionStorage.getItem("productList") as any);
        if (this.product && this.product.length) {
            let totalQ = 0;
            let totalNumber = 0;
            this.product.forEach((item: any) => {
                totalQ += item.quantity;
                totalNumber += +(item.price) * item.quantity;
            });
            this.soluong = String(totalQ);
            this.total = String(totalNumber);
        }

    }

    formatCash(str: string) {
        str = String(str);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    onBuyNow() {
        Utils.sha256((Math.random() + 1).toString(36).substring(7)).then(eCode => {
            sessionStorage.setItem(eCode, JSON.stringify(this.product));
            window.open(`${window.location.origin}/thanh-toan?code=${eCode}`, "_self");
        });
    }

    onChange(event: any, index: number) {
        if (this.product && this.product.length) {
            let totalNumber = 0;
            let totalQ = 0;
            this.product.forEach((item: any, i: any) => {
                if (i === index) {
                    item.quantity = event.value;
                    item.totalPrice = String(+(item.price) * item.quantity);
                    totalNumber += +(item.price) * item.quantity;
                }
                totalQ += item.quantity;
            });
            this.soluong = String(totalQ);
            this.total = String(totalNumber);
            sessionStorage.clear();
            sessionStorage.setItem('productList', JSON.stringify(this.product));
        }
    }

    onRemove(index: number) {
        let totalQ = 0;
        if (this.product && this.product.length) {
            this.product = this.product.slice(1, index);
            let totalNumber = 0;
            this.product.forEach((item: any, i: any) => {
                totalNumber += +(item.price) * item.quantity;
                totalQ += item.quantity;
            });
            this.total = String(totalNumber);
            this.soluong = String(totalQ);
            sessionStorage.clear();
            sessionStorage.setItem('productList', JSON.stringify(this.product));
        }
    }
}

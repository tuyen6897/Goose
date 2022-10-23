import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-productDialog',
    templateUrl: './productDialog.component.html',
    styleUrls: ['./productDialog.component.scss']
})

export class ProductDialogComponent implements OnInit {

    scrollableItems!: MenuItem[];
    isShow = false;
    activeItem!: MenuItem;

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private router: Router
    ) { }
    imagesProductWatch = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ]
    data: any;
    inputQuantity: number = 1;
    ngOnInit() {
        this.data = this.config.data
        this.inputQuantity = this.data.quantity;
        this.scrollableItems = [{ label: 'Thông số kỹ thuật' }, { label: 'Chi tiết sản phẩm' }];


        this.activeItem = this.scrollableItems[0];
    }

    onClickBuyNew(event: any) {
        this.ref.close();
        let product: any[] = [];
        let insertFlag = false;
        product = JSON.parse(sessionStorage.getItem("productList") as any);
        if (product && product.length) {
            product.forEach(element => {
                if (element.id === 'new8938521954248') {
                    insertFlag = true;
                    element.quantity = +(element.quantity) + this.inputQuantity;
                    element.totalPrice = 210000 * element.quantity;
                }
            });
        }
        if (!insertFlag || (product && !product.length)) {
            product = [];
            product.push({
                id: 'new8938521954248',
                title: 'Mật Trà Kombucha Thảo Mộc',
                image: '',
                price: '210000',
                variant: '500ml',
                totalPrice: 210000 * this.inputQuantity,
                quantity: this.inputQuantity
            });
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        this.router.navigate(['gio-hang']);
    }
}

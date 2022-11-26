import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Utils } from '../util/utils';

@Component({
    selector: 'app-productDialog',
    templateUrl: './productDialog.component.html',
    styleUrls: ['./productDialog.component.scss']
})

export class ProductDialogComponent implements OnInit {

    scrollableItems!: MenuItem[];
    isShow = false;
    activeItem!: MenuItem;
    productVariant: any = null;
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
        this.data = this.config.data;
        this.productVariant = this.data.productVariants[0];
        this.data.productVariants[0].check = true;
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
                if (element.id === this.productVariant.productId && element.idVariant === this.productVariant.id) {
                    insertFlag = true;
                    element.quantity = +(element.quantity) + this.inputQuantity;
                    element.totalPrice = this.productVariant.price * element.quantity;
                }
            });
        }
        if (!insertFlag) {
            product.push({
                idVariant: this.productVariant.id,
                id: this.productVariant.productId,
                name: this.data.name,
                image: this.data.productImages,
                price: this.productVariant.price,
                weight: this.productVariant.weight,
                unit: this.productVariant.unit,
                variant: `${this.productVariant.weight}${this.productVariant.unit}`,
                totalPrice: this.productVariant.price * this.inputQuantity,
                quantity: this.inputQuantity,
                soGaoFlag: this.data.soGaoFlag
            });
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        this.router.navigate(['gio-hang']);
    }

    onCheck(item: any) {
        item.check = true;
        this.data.productVariants.forEach((product: any) => {
            product.check = false;
            if (item.code === product.code) {
            }
        });

        this.data.productVariants.find((x: any) => x.code === item.code).check = true;
        this.productVariant = item;
    }

    onProduct(url: any) {
        window.open(url, "_self");
    }

    formatCashProduct(value: any) {
        return Utils.formatCash(String(value));
    }


    createURL(name: string, id: string) {
        if (!name || !id) return '';
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }
}

import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { ProductDialogComponent } from '../productDialog/productDialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Utils } from 'src/app/common/util/utils';
import { ComponentBaseComponent } from '../componentBase/componentBase.component';
import { MessageService } from 'primeng/api';
import { HttpService } from '../service/http-service';
@Component({
    selector: 'app-img-product',
    templateUrl: './img-product.component.html',
    styleUrls: ['./img-product.component.scss'],
    providers: [DialogService]
})
export class ImgProductComponent extends ComponentBaseComponent implements OnInit {

    animal: string = '';
    @Input() sale: string = '';
    @Input() data: any = null;
    @Output() eventClick: EventEmitter<any> = new EventEmitter<any>();
    constructor(private dialogService: DialogService, private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }
    ref!: DynamicDialogRef;
    ngOnInit() {
    }

    formatCashProduct(value: any) {
        return Utils.formatCash(String(value));
    }

    createURL(name: string) {
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}`
    }

    openDialog(item: any): void {
        if (item.price.split('-').length === 1) {
            let product: any[] = [];
            let insertFlag = false;
            product = JSON.parse(sessionStorage.getItem("productList") as any);
            if (product && product.length) {
                product.forEach(element => {
                    if (element.id === item.productVariant.productId && element.idVariant === item.productVariant.id) {
                        insertFlag = true;
                        element.quantity = +(element.quantity) + 1;
                        element.totalPrice = item.productVariant.price * element.quantity;
                    }
                });
            }
            if (!insertFlag) {
                product.push({
                    idVariant: item.productVariant.id,
                    id: item.productVariant.productId,
                    name: item.name,
                    image: item.productImages,
                    price: item.productVariant.price,
                    weight: item.productVariant.weight,
                    unit: item.productVariant.unit,
                    variant: `${item.productVariant.weight}${item.productVariant.unit}`,
                    totalPrice: item.productVariant.price,
                    quantity: 1,
                    soGaoFlag: item.soGaoFlag
                });
            }
            sessionStorage.setItem('productList', JSON.stringify(product));
            window.open(`${window.location.origin}/gio-hang`, "_self");
        }
        this.showDialog('on');
        this.httpService.reqeustApiget('productDetails', item.id).subscribe((response: any) => {
            if (response.detailProduct) {
                this.ref = this.dialogService.open(ProductDialogComponent, {
                    header: 'Lựa Chọn Thuộc Tính',
                    width: '70%',
                    contentStyle: { "max-height": "600px", "overflow": "auto" },
                    baseZIndex: 10000,
                    dismissableMask: true,
                    data: response.detailProduct
                });
            }
            this.showDialog('off');
        });
    }

    addCart(item: any) {
        const account = this.getAccount();
        let product: any[] = [];
        let insertFlag = true;
        product = JSON.parse(sessionStorage.getItem("productList") as any) ? JSON.parse(sessionStorage.getItem("productList") as any) : [];
        if (product && product.length) {
            product.forEach(element => {
                if (element.id === item.id) {
                    insertFlag = false;
                    element.quantity = +(element.quantity) + 1;
                    element.totalPrice = item.productVariant.price * element.quantity;
                }
            });
        }
        if (insertFlag) {
            product.push({
                idVariant: item.productVariant.id,
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.productVariant.price,
                weight: item.productVariant.weight,
                unit: item.productVariant.unit,
                variant: `${item.productVariant.weight}${item.productVariant.unit}`,
                totalPrice: item.productVariant.price,
                quantity: 1,
                soGaoFlag: item.soGaoFlag ? item.soGaoFlag : 0
            });
        }
        if (account) {
            const params = {
                "userId": account.id,
                "productVariantId": item.id,
                "quantity": 1
            }
            this.httpService.reqeustApiPost('carts', params, true).subscribe((data: any) => {
            });
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        // this.header.visibleSidebar = true;
        this.eventClick.emit();
    }

}

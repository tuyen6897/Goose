import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductDialogComponent } from '../productDialog/productDialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Utils } from 'src/app/common/util/utils';
@Component({
    selector: 'app-img-product',
    templateUrl: './img-product.component.html',
    styleUrls: ['./img-product.component.scss'],
    providers: [DialogService]
})
export class ImgProductComponent implements OnInit {

    animal: string = '';
    @Input() sale: string = '';
    @Input() data: any = null;
    @Output() eventClick: EventEmitter<any> = new EventEmitter<any>();
    constructor(private dialogService: DialogService) { }
    ref!: DynamicDialogRef;
    ngOnInit() {
    }

    formatCashProduct(value: any) {
        return Utils.formatCash(String(value));
    }

    createURL(name: string) {
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}`
    }

    openDialog(data: any): void {
        this.ref = this.dialogService.open(ProductDialogComponent, {
            header: 'Lựa Chọn Thuộc Tính',
            width: '70%',
            contentStyle: { "max-height": "600px", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                id: data.id,
                title: data.name,
                image: data.image,
                price: data.price,
                variant: data!.variant,
                totalPrice: data.price,
                quantity: 1
            }
        });
    }

    addCart(data: any) {
        let product: any[] = [];
        let insertFlag = false;
        product = JSON.parse(sessionStorage.getItem("productList") as any);
        if (product && product.length) {
            product.forEach(element => {
                if (element.id === data.id) {
                    insertFlag = true;
                    element.quantity = +(element.quantity) + 1;
                    element.totalPrice = 210000 * element.quantity;
                }
            });
        }
        if (!insertFlag || (product && !product.length)) {
            product = [];
            product.push({
                id: data.id,
                title: data.name,
                image: data.image,
                price: data.price,
                variant: data!.variant,
                totalPrice: data.price,
                quantity: 1
            });
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        this.eventClick.emit();
    }

}

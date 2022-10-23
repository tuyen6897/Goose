import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductDialogComponent } from '../productDialog/productDialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
    selector: 'app-img-product',
    templateUrl: './img-product.component.html',
    styleUrls: ['./img-product.component.scss'],
    providers: [DialogService]
})
export class ImgProductComponent implements OnInit {

    animal: string = '';
    @Input() sale: string = '';
    @Input() imgSrc: string = '';
    @Output() eventClick: EventEmitter<any> = new EventEmitter<any>();
    constructor(private dialogService: DialogService) { }
    ref!: DynamicDialogRef;
    ngOnInit() {
    }

    openDialog(): void {
        this.ref = this.dialogService.open(ProductDialogComponent, {
            header: 'Lựa Chọn Thuộc Tính',
            width: '70%',
            contentStyle: { "max-height": "600px", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                id: 'new8938521954248',
                title: 'Mật Trà Kombucha Thảo Mộc',
                image: '',
                price: '210000',
                variant: '500ml',
                totalPrice: 210000,
                quantity: 1
            }
        });
    }

    addCart(event: any) {
        let product: any[] = [];
        let insertFlag = false;
        product = JSON.parse(sessionStorage.getItem("productList") as any);
        if (product && product.length) {
            product.forEach(element => {
                if (element.id === 'new8938521954248') {
                    insertFlag = true;
                    element.quantity = +(element.quantity) + 1;
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
                totalPrice: 210000 * 1,
                quantity: 1
            });
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        this.eventClick.emit();
    }

}

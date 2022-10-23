import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from '../productDialog/productDialog.component';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DialogService]
})
export class CarouselComponent implements OnInit {

    @Output() eventClick: EventEmitter<any> = new EventEmitter<any>();
    ref!: DynamicDialogRef;
    @Input() size: number = 0;
    @Input() prod: string = 'imange';
    @Input() slideItems: string[] = [];
    @Input() className: string = '';
    @Input() images: string[] = [];
    @Input() styleName: string = '';
    @Input() datas: any[] = [];
    @Input() product: boolean = false;
    @Input() i_con: boolean = false;
    @Input() feedback: boolean = false;
    @Input() news: boolean = false;
    @Input() newspapers: boolean = false;
    @Input() prize: boolean = false;
    @Input() form: boolean = false;
    @Input() showButton: boolean = true;
    @Input() numVisible: number = 4;
    @Input() responsiveOptions: any = [
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private dialogService: DialogService) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '800px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

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

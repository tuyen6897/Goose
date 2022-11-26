import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComponentBaseComponent } from '../componentBase/componentBase.component';
import { ProductDialogComponent } from '../productDialog/productDialog.component';
import { HttpService } from '../service/http-service';
import { Utils } from '../util/utils';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DialogService]
})
export class CarouselComponent extends ComponentBaseComponent implements OnInit {

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
    @Input() thumbnail: boolean = false;
    @Input() showButton: boolean = true;
    @Input() numVisible: number = 4;
    @Input() latestnews: boolean = false;
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

    constructor(private dialogService: DialogService, private render2: Renderer2, private httpService: HttpService) {
        super(new MessageService, render2);
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

    createURL(name: string, id: string) {
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }
}

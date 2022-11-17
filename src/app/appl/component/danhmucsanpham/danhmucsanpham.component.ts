import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ProductDialogComponent } from 'src/app/common/productDialog/productDialog.component';
import { FileModel } from 'src/app/common/model/file.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentDialogComponent } from 'src/app/common/commentDialog/commentDialog.component';
import { HttpService } from 'src/app/common/service/http-service';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { MessageService } from 'primeng/api';
import { Utils } from 'src/app/common/util/utils';

@Component({
    selector: 'app-danhmucsanpham',
    templateUrl: './danhmucsanpham.component.html',
    styleUrls: ['./danhmucsanpham.component.scss'],
    providers: [DialogService]
})
export class DanhmucsanphamComponent extends ComponentBaseComponent implements OnInit {
    isShow = false;
    isShowbutton = false;
    imageList: FileModel[] = [];
    productList: any[] = [];
    constructor(private dialogService: DialogService, private sanitizen: DomSanitizer, private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('comment', { static: false }) comment!: ElementRef;
    ref!: DynamicDialogRef;
    datasSale: any[] = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ]

    productDisplayList: any[] = [
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
        { 'id': 'SP000001', image: '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp' },
    ];

    imagesProductWatch = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ]

    datasProductSeen = [
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '200.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '250.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000'
        }
    ];
    responsiveOptions = [
        {
            breakpoint: '1920px',
            numVisible: 5,
            numScroll: 1
        },
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

    rightBanner: any = null;

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiPost('products', {
            "categoryId": 0,
            "brandName": "",
            "minPrice": 0,
            "maxPrice": -1,
            "productName": "",
            "orderType": 0,
            "pageIndex": 0,
            "pageSize": 1000
        }).subscribe((data: any) => {
            if (data.products) {
                this.productList = data.products;
                this.productDisplayList = [...this.productList.slice(0, 12)];
                this.isShowbutton = this.productList.length > 12 ? true : false;
            }
            this.httpService.reqeustApiget('newest-sale', 'limit=10').subscribe((data: any) => {
                if (data.products.length) {
                    this.datasSale = data.products;

                }
                this.httpService.reqeustApiget('rightBanner').subscribe((data: any) => {
                    if (data.banner) {
                        this.rightBanner = data.banner;
                        this.showLoadingDialog('off');
                    }

                });
            });
        });
    }

    formatCashProduct(value: any) {
        return Utils.formatCash(String(value));
    }

    createURL(name: string) {
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}`
    }

    show() {
        this.productDisplayList = [...this.productList];
        this.isShowbutton = false;
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
        this.header.visibleSidebar = true;
    }

    selectFileChange(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];

            const fileModel: FileModel = {
                file: file,
                url: this.sanitizen.bypassSecurityTrustUrl(
                    window.URL.createObjectURL(file)
                )
            }

            this.imageList.push(fileModel);
        }
    }

    openDialogComment(): void {
        this.ref = this.dialogService.open(CommentDialogComponent, {
            width: '25%',
            contentStyle: { "height": "auto", "overflow": "auto" },
            header: 'Thông tin người gửi',
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                'files': this.imageList,
                'comment': this.comment.nativeElement.value
            }
        });
    }

    detailProduct(id: string) {
        window.open(`${window.location.origin}/chi-tiet-san-pham?code=${id}`, "_self");
    }

    thOnChange(event: any) {
        if (event.target.checker) {
            this.productDisplayList = this.productList.filter(x => x.branchname === event.target.id);
        }
    }

    kgOnChange(event: any) {
        if (event.target.checker) {
            const values = event.target.value.split('-');
            this.productDisplayList = this.productList.filter(x => this.checkPrice(x.price, values));
        }
    }

    checkPrice(price: any, values: any[]) {
        if (values.length === 1) {
            if (values[0] === '100000') {
                return price < values[0];
            } else {
                return price > values[0];
            }
        } else {
            return (price >= values[0] && price <= values[0]);
        }
    }



}

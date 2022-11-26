import { Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
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
    @ViewChild('order', { static: false }) order!: ElementRef;
    @ViewChild('seenProduct', { static: false }) seenProduct!: ElementRef;
    @ViewChild('collectionsidebar', { static: false }) collectionsidebar!: ElementRef;

    isPrince = false;
    isTrademark = false;

    ref!: DynamicDialogRef;
    datasSale: any[] = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ];

    princeList = [
        { value: '0', name: 'Tất cả' },
        { value: '100000', name: 'Nhỏ hơn 100,000₫' },
        { value: '100000-200000', name: 'Từ 100,000₫ - 200,000₫' },
        { value: '200000-300000', name: 'Từ 200,000₫ - 300,000₫' },
        { value: '300000-400000', name: 'Từ 300,000₫ - 400,000₫' },
        { value: '400000-500000', name: 'Từ 400,000₫ - 500,000₫' },
        { value: '500000', name: 'Lớn hơn 500,000₫' },
    ]

    productFilter: any[] = [];

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
    productCategories: string = '';
    brandNames: any[] = [];
    ngOnInit() {
        this.showLoadingDialog('on');
        const id = window.location.search.split('id=')[1] ? window.location.search.split('id=')[1] : 0;
        this.httpService.reqeustApiget('product_categories').subscribe((data: any) => {
            if (data.productCategories) {
                data.productCategories.forEach((item: any) => {
                    if (+(id) === item.id) {
                        this.productCategories = item.name;
                    }
                });
            }
        })
        this.httpService.reqeustApiPost('products', {
            "categoryId": id,
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
                this.httpService.reqeustApiget('brand-names').subscribe((data: any) => {
                    if (data.brandNames) {
                        this.brandNames = data.brandNames;
                    }

                });
            });
        });
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        const collectionsidebarBound = this.collectionsidebar.nativeElement.getBoundingClientRect();
        const orderBound = this.order.nativeElement.getBoundingClientRect();
        const seenPrd = this.seenProduct.nativeElement.getBoundingClientRect();
        if ((collectionsidebarBound.top + collectionsidebarBound.height) <= 100) {
            this.render2.setStyle(this.order.nativeElement, 'position', 'absolute');
            this.render2.setStyle(this.order.nativeElement, 'top', `${window.scrollY + 100}px`);
            this.render2.addClass(this.order.nativeElement, 'box-stick');
        } else {
            this.render2.removeStyle(this.order.nativeElement, 'position');
            this.render2.removeClass(this.order.nativeElement, 'box-stick');
        }

        if (seenPrd.top < orderBound.height + 100) {
            this.render2.removeStyle(this.order.nativeElement, 'position');
            this.render2.removeClass(this.order.nativeElement, 'box-stick');
        }
    }

    formatCashProduct(value: any) {
        return Utils.formatCash(String(value));
    }

    createURL(name: string, id: string) {
        if (!name || !id) return '';
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }

    show() {
        let products = [];
        products = this.productFilter.length ? [...this.productFilter] : [...this.productList];
        this.productDisplayList = [...products];
        this.isShowbutton = false;
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
        if (event.currentTarget.checked) {
            this.productDisplayList = this.productList.filter(x => x.branchname === event.target.id);
        }
    }

    kgOnChange(event: any) {
        if (event.currentTarget.checked) {
            this.isPrince = true;
            const values = event.target.value.split('-');
            if (this.isTrademark) {
                this.productFilter = this.productFilter.filter(x => this.checkPrice(x.price, values));
            } else {
                this.productFilter = this.productList.filter(x => this.checkPrice(x.price, values));
            }
            this.productDisplayList = this.productFilter.slice(0, 12);
            this.isShowbutton = this.productFilter.length > 12 ? true : false;
        }
    }

    checkPrice(price: any, values: any[]) {
        if (values.length === 1) {
            if (values[0] === '100000') {
                return price < values[0];
            } else if (!+(values[0])) {
                return true;
            } else {
                return price > values[0];
            }
        } else {
            return (price >= values[0] && price <= values[0]);
        }
    }

    onSort(value: any) {
        let products = this.productFilter.length ? this.productFilter : this.productList;
        let data: any[] = [];
        if (value === 'asc') {
            products = this.getSortedData(products, 'price', true);
        } else if (value === 'desc') {
            products = this.getSortedData(products, 'price', false);
        };
        this.productDisplayList = this.isShowbutton ? products.slice(0, 12) : products;
    }
    getSortedData(data: any[], prop: any, isAsc: any) {
        return data.sort((a, b) => {
            return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
        });
    }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommentDialogComponent } from 'src/app/common/commentDialog/commentDialog.component';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FileModel } from 'src/app/common/model/file.model';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';

@Component({
    selector: 'app-chitietsanpham',
    templateUrl: './chitietsanpham.component.html',
    styleUrls: ['./chitietsanpham.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DialogService]
})
export class ChitietsanphamComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('productFix', { static: true }) productFix!: ElementRef;
    @ViewChild('description', { static: true }) description!: ElementRef;
    @ViewChild('nutrition', { static: true }) nutrition!: ElementRef;

    @ViewChild('comment', { static: false }) comment!: ElementRef;
    @ViewChild('commentTitle', { static: false }) commentTitle!: ElementRef;
    @ViewChild('reviews', { static: true }) reviews!: ElementRef;
    val2: number = 5;
    @Input() value: unknown
    @Output() valueChange = new EventEmitter<unknown>();
    isShowD: boolean = false;
    isShowE: boolean = false;
    isSlide: boolean = false;
    inputQuantity: number = 1;
    ref!: DynamicDialogRef;
    imageList: FileModel[] = [];
    imageList2: number = 10;
    product: any;
    productVariant: any;
    productVariants: any[] = [];
    images: { previewImageSrc: string; thumbnailImageSrc: string; }[] = [{
        "previewImageSrc": '../../../../assets/image/main/giao-hang-removebg-preview.png',
        "thumbnailImageSrc": '../../../../assets/image/main/giao-hang-removebg-preview.png',
    },
    {
        "previewImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        "thumbnailImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    },
    {
        "previewImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        "thumbnailImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    },
    {
        "previewImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        "thumbnailImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    },
    {
        "previewImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        "thumbnailImageSrc": '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    }];

    imagesProductGroup = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ]

    imagesProductWatch = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ]

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images && 0 <= newValue && newValue <= (this.images.length - 1)) {
            this._activeIndex = 2;
        }
    }

    _activeIndex: number = 0;

    responsiveOptions: any[] = [
        {
            breakpoint: '1120px',
            numVisible: 4
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 3
        }
    ];

    responsiveOptions2: any[] = [
        {
            breakpoint: '1920px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

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

    datasProductSale: any[] = [];

    constructor(private router: Router
        , private render2: Renderer2
        , private httpService: HttpService
        , private dialogService: DialogService
        , private sanitizen: DomSanitizer) {
        super(new MessageService, render2);
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('productDetails', window.location.search.split('id=')[1]).subscribe((response: any) => {
            if (response.detailProduct) {
                this.images = [];
                response.detailProduct.productImages.forEach((image: any) => {
                    this.images.push({
                        "previewImageSrc": image,
                        "thumbnailImageSrc": image
                    });
                })
                console.log(response.detailProduct);
                this.product = response.detailProduct;
                this.productVariant = this.product.productVariants[0];
                this.product.productVariants[0].check = true;
                this.productVariants = this.product.productVariants;
                this.description.nativeElement.innerHTML = this.product.description;
                this.nutrition.nativeElement.innerHTML = this.product.nutrition;
            }
            this.showLoadingDialog('off');
        });

        this.httpService.reqeustApiget('newest-sale', 'limit=10').subscribe((data: any) => {
            if (data.products.length) {
                this.datasProductSale = data.products;
                this.datasProductSale.forEach((data) => {
                    data.priceDisp = data.saleRate ? data.salePrice : data.price;
                })
            }
        });
        this.render2.listen(document, 'scroll', (e) => {
            const scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            if (scrollTop >= 890) {
                this.render2.addClass(this.productFix.nativeElement, 'scroll-product');
                this.isSlide = true;
            } else {
                this.render2.removeClass(this.productFix.nativeElement, 'scroll-product');
                this.isSlide = false;
            }
        });
    }

    formatCashProduct(value: any) {
        return Utils.formatCash(String(value));
    }

    onCheck(item: any) {
        item.check = true;
        this.productVariants.forEach((product: any) => {
            product.check = false;
            if (item.code === product.code) {
            }
        });

        this.productVariants.find(x => x.code === item.code).check = true;
        this.productVariant = item;
    }

    onActive(thumbnailImageSrc: any) {
        this.images.forEach((image: any, i: any) => {
            if (image.thumbnailImageSrc === thumbnailImageSrc) {
                this.activeIndex = i;
                return;
            }
        })
    }

    addCart(event: any) {
        const account = this.getAccount();
        let product: any[] = [];
        let insertFlag = false;
        product = JSON.parse(sessionStorage.getItem("productList") as any) ? JSON.parse(sessionStorage.getItem("productList") as any) : [];
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
                name: this.product.name,
                image: this.product.productImages,
                price: this.productVariant.price,
                weight: this.productVariant.weight,
                unit: this.productVariant.unit,
                variant: `${this.productVariant.weight}${this.productVariant.unit}`,
                totalPrice: this.productVariant.price * this.inputQuantity,
                quantity: this.inputQuantity,
                soGaoFlag: this.product.soGaoFlag
            });
            if (account) {
                const params = {
                    "userId": account.id,
                    "productVariantId": this.productVariant.id,
                    "quantity": this.inputQuantity
                }
                this.httpService.reqeustApiPost('carts', params, true);
            }
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        this.header.visibleSidebar = true;
    }

    onClickBuyNew(event: any) {
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
                name: this.product.name,
                image: this.product.productImages,
                price: this.productVariant.price,
                weight: this.productVariant.weight,
                unit: this.productVariant.unit,
                variant: `${this.productVariant.weight}${this.productVariant.unit}`,
                totalPrice: this.productVariant.price * this.inputQuantity,
                quantity: this.inputQuantity,
                soGaoFlag: this.product.soGaoFlag
            });
        }
        sessionStorage.setItem('productList', JSON.stringify(product));
        this.router.navigate(['gio-hang']);
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
                'comment': this.comment.nativeElement.value,
                'commentTitle': this.commentTitle.nativeElement.value,
            }
        });
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

    createURL(name: string, id: string) {
        if (!name || !id) return '';
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }

}

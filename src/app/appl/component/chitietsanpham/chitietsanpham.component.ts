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
    // @ViewChild('option500', { static: false }) option500!: ElementRef;
    @ViewChild('comment', { static: false }) comment!: ElementRef;
    @ViewChild('commentTitle', { static: false }) commentTitle!: ElementRef;
    @ViewChild('reviews', { static: true }) reviews!: ElementRef;
    val2: number = 5;
    @Input() value: unknown
    @Output() valueChange = new EventEmitter<unknown>();
    isShow: boolean = false;
    isSlide: boolean = false;
    inputQuantity: number = 1;
    ref!: DynamicDialogRef;
    imageList: FileModel[] = [];
    imageList2: number = 10;
    product: any;
    productVariant: any;
    productVariants: any[] = [];
    images: { previewImageSrc: string; thumbnailImageSrc: string; }[] = [{
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

    datasProductSale = [
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '200.000',
            moneyoriginal: '255.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '250.000',
            moneyoriginal: '316.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        },
        {
            image: "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
            sale: '21',
            title: 'Mật Trà Kombucha Thảo Mộc',
            money: '155.000',
            moneyoriginal: '196.000'
        }
    ];

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
                this.product = response.detailProduct;
                this.productVariant = this.product.productVariants[0];
                this.product.productVariants[0].check = true;
                this.productVariants = this.product.productVariants;
                this.description.nativeElement.innerHTML = this.product.description;
            }


            this.showLoadingDialog('off');
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

    onActive(index: number) {
        this.activeIndex = index;
    }

    addCart(event: any) {
        const account = this.getAccount();
        let product: any[] = [];
        let insertFlag = false;
        product = JSON.parse(sessionStorage.getItem("productList") as any) ? JSON.parse(sessionStorage.getItem("productList") as any) : [];
        if (product && product.length) {
            product.forEach(element => {
                if (element.code === this.product.code && element.idVariant === this.productVariant.id) {
                    insertFlag = true;
                    element.quantity = +(element.quantity) + this.inputQuantity;
                    element.totalPrice = this.productVariant.price * element.quantity;
                }
            });
        }
        if (!insertFlag) {
            product.push({
                idVariant: this.productVariant.id,
                code: this.product.code,
                id: this.product.id,
                name: this.product.name,
                image: this.product.image,
                price: this.productVariant.price,
                size: this.productVariant.size,
                unit: this.productVariant.unit,
                variant: `${this.productVariant.size}${this.productVariant.unit}`,
                totalPrice: this.productVariant.price * this.inputQuantity,
                quantity: this.inputQuantity
            });
            sessionStorage.setItem('productList', JSON.stringify(product));
            if (account) {
                const params = {
                    "userId": account.id,
                    "productVariantId": this.productVariant.id,
                    "quantity": this.inputQuantity
                }
                this.httpService.reqeustApiPost('carts', params, true);
            }
        }
        this.header.visibleSidebar = true;
    }

    onClickBuyNew(event: any) {
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

}

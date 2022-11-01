import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommentDialogComponent } from 'src/app/common/commentDialog/commentDialog.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FileModel } from 'src/app/common/model/file.model';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-chitietsanpham',
    templateUrl: './chitietsanpham.component.html',
    styleUrls: ['./chitietsanpham.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DialogService]
})
export class ChitietsanphamComponent implements OnInit {

    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('productFix', { static: true }) productFix!: ElementRef;
    @ViewChild('option100', { static: false }) option100!: ElementRef;
    @ViewChild('option500', { static: false }) option500!: ElementRef;
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
        , private render: Renderer2
        , private httpService: HttpService
        , private dialogService: DialogService
        , private sanitizen: DomSanitizer) { }

    ngOnInit() {
        this.httpService.reqeustApiget('productDetails', window.location.search.split('?code=')[1]).subscribe((response: any) => {
            console.log(response);
            this.product = response;
        });
        this.render.listen(document, 'scroll', (e) => {
            const scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            console.log(scrollTop);
            if (scrollTop >= 890) {
                this.render.addClass(this.productFix.nativeElement, 'scroll-product');
                this.isSlide = true;
            } else {
                this.render.removeClass(this.productFix.nativeElement, 'scroll-product');
                this.isSlide = false;
            }
        });
    }

    onCheck(event: any) {
        console.log(event);
        if (event.target.value === '100') {
            this.option100.nativeElement.classList.add('sp');
            const img100 = this.option100.nativeElement.querySelector('.img-check');
            img100.style.display = 'block';
            this.option500.nativeElement.classList.remove('sp');
            const img500 = this.option500.nativeElement.querySelector('.img-check');
            img500.style.display = 'none';
        } else {
            this.option500.nativeElement.classList.add('sp');
            const img500 = this.option500.nativeElement.querySelector('.img-check');
            img500.style.display = 'block';
            this.option100.nativeElement.classList.remove('sp');
            const img100 = this.option100.nativeElement.querySelector('.img-check');
            img100.style.display = 'none';
        }
    }

    onActive(index: number) {
        this.activeIndex = index;
    }

    addCart(event: any) {
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ProductDialogComponent } from 'src/app/common/productDialog/productDialog.component';
import { FileModel } from 'src/app/common/model/file.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentDialogComponent } from 'src/app/common/commentDialog/commentDialog.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-danhmucsanpham',
    templateUrl: './danhmucsanpham.component.html',
    styleUrls: ['./danhmucsanpham.component.scss'],
    providers: [DialogService]
})
export class DanhmucsanphamComponent implements OnInit {
    isShow = false;
    isShowbutton = false;
    imageList: FileModel[] = [];
    productList: any[] = [];
    constructor(private dialogService: DialogService, private sanitizen: DomSanitizer, private httpService: HttpService) { }
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('comment', { static: false }) comment!: ElementRef;
    ref!: DynamicDialogRef;
    imagesProductSale = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
    ]

    imagesProduct = [
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

    ngOnInit() {
        this.httpService.reqeustApiget('products', {
            "categoryId": 0,

        }).subscribe((data: any) => {
            console.log(data);
        });
        this.productList = [...this.imagesProduct.slice(0, 12)];
        this.isShowbutton = this.imagesProduct.length > 12 ? true : false;
    }

    show() {
        this.productList = [...this.imagesProduct];
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

}

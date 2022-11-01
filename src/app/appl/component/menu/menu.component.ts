import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

    @ViewChild('header', { static: false }) header!: HeaderComponent;
    isMobile: boolean = false;
    imageGroup: any[] = [];
    sizeProduct: number = 0;
    datasSale: any[] = [];
    productList: any[] = [];
    postList: any[] = [];
    postNewsList: any[] = [];
    numVisible: number = 0;
    responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1000px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '680px',
            numVisible: 2,
            numScroll: 1
        }
    ];

    imagesHome = [
        {
            img: "../../../../assets/image/main/ms_banner_img1.jpg",
            url: 'https://www.chuyendicuangong.vn/'
        },
        {
            img: "../../../../assets/image/main/ms_banner_img2.jpg",
            url: 'danh-muc-san-pham'
        },
        {
            img: "../../../../assets/image/main/ms_banner_img4.jpg",
            url: 'danh-muc-san-pham'
        }
    ]

    images = [
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
    ];

    imagesMember = [
        {
            title: 'Bột sữa hạt Vui Khỏe Đẹp làm ra từ cá loại đậu hạt ưu tiên tuyển chọn từ những vùng nguyên',
            image: "../../../../assets/image/main/member1.png"
        },
        {
            title: 'Bột sữa hạt Vui Khỏe Đẹp làm ra từ cá loại đậu hạt ưu tiên tuyển chọn từ những vùng nguyên',
            image: "../../../../assets/image/main/member1.png"
        },
        {
            title: 'Bột sữa hạt Vui Khỏe Đẹp làm ra từ cá loại đậu hạt ưu tiên tuyển chọn từ những vùng nguyên',
            image: "../../../../assets/image/main/member1.png"
        },
        {
            title: 'Bột sữa hạt Vui Khỏe Đẹp làm ra từ cá loại đậu hạt ưu tiên tuyển chọn từ những vùng nguyên',
            image: "../../../../assets/image/main/member1.png"
        }
    ]

    imagetrademark = [
        {
            image: "../../../../assets/image/icons/hteamus_3.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_2.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_5.png"
        },
        {
            image: "../../../../assets/image/icons/hteamus_7.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_9.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_3.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_2.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_5.png"
        },
        {
            image: "../../../../assets/image/icons/hteamus_7.webp"
        }
    ]

    imagesProduct = [
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp",
        "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp"
    ]

    image: string = "../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp"

    slides: any = [];
    constructor(private httpService: HttpService) {
        this.numVisible = 6;
    }

    ngOnInit() {

        this.httpService.reqeustApiget('newest-sale', '10').subscribe((data: any) => {
            if (data.detailProduct) {
                this.datasSale = data.detailProduct;
            }
        });

        this.httpService.reqeustApiget('productDetails', {
            "categoryId": 0,
            "minPrice": 0,
            "maxPrice": -1,
            "pageIndex": 1,
            "pageSize": 8
        }).subscribe((data: any) => {
            if (data.detailProduct) {
                this.productList = data.detailProduct;
            }
        });

        this.httpService.reqeustApiget('post', 'menuCode=du-an-khac&pageIndex=1&pageSize=4').subscribe((data: any) => {
            if (data.postList) {
                this.postList = data.postList;
            }
        });

        this.httpService.reqeustApiget('post', 'menuCode=tin-tuc&pageIndex=1&pageSize=4').subscribe((data: any) => {
            if (data.postList) {
                this.postNewsList = data.postList;
            }
        });

        Utils.sha256('129313').then(hash => console.log(hash));
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
        this.datasSale = [
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
        ]
    }

    hexToBytes(hex: string) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i !== bytes.length; i++) {
            bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        return bytes;
    }

    @HostListener('window: resize', ['$event'])
    resizeable(event: any) {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
            this.sizeProduct = 2;
        } else {
            this.isMobile = false;
            this.sizeProduct = 5;
        }
    }

    onClick(url: any) {
        if (url.includes('http')) {
            window.location.href = url;
        } else {
            window.location.href = `${window.location.href}${url}`;
        }
    }

    addCart() {
        this.header.visibleSidebar = true;
    }
}

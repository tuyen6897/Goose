import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer2, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('header', { static: false }) header!: HeaderComponent;
    isMobile: boolean = false;
    imageGroup: any[] = [];
    sizeProduct: number = 0;
    datasSale: any[] = [];
    productList: any[] = [];
    projectList: any[] = [];
    projectOther: any[] = [];
    projectChuyenDi: any = null;
    sogao: any = null;
    postNewsList: any[] = [
        {
            postTitle: "",
            imageUrl: "",
            targetUrl: ""
        },
        {
            postTitle: "",
            imageUrl: "",
            targetUrl: ""
        },
        {
            postTitle: "",
            imageUrl: "",
            targetUrl: ""
        },
        {
            postTitle: "",
            imageUrl: "",
            targetUrl: ""
        }
    ];
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

    responsivefeedback = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1366px',
            numVisible: 3,
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

    bannerList = [
        {
            imageUrl: "../../../../assets/image/main/ms_banner_img1.jpg",
            targetUrl: 'https://www.chuyendicuangong.vn/'
        },
        {
            imageUrl: "../../../../assets/image/main/ms_banner_img2.jpg",
            targetUrl: 'danh-muc-san-pham'
        },
        {
            imageUrl: "../../../../assets/image/main/ms_banner_img4.jpg",
            targetUrl: 'danh-muc-san-pham'
        }
    ];
    bannerMiddlePage: any = {
        imageUrl: '',
        targetUrl: ''
    };

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

    partnerList: any[] = [

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
    constructor(private httpService: HttpService, private rend: Renderer2) {
        super(new MessageService, rend);
        this.numVisible = 6;
    }

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
            "pageSize": 8
        }).subscribe((data: any) => {
            if (data.products.length) {
                this.productList = data.products;
            }
            this.httpService.reqeustApiget('newest-sale', 'limit=10').subscribe((data: any) => {
                if (data.products.length) {
                    this.datasSale = data.products;
                }
            });
            this.httpService.reqeustApiget('projects').subscribe((data: any) => {
                if (data.projectList) {
                    this.projectList = data.projectList;
                    this.projectOther = this.projectList.filter(x => x.name !== 'Chuyến đi của Ngỗng');
                    this.projectChuyenDi = this.projectList.find(x => x.name === 'Chuyến đi của Ngỗng');
                }
            });
            this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=4').subscribe((data: any) => {
                if (data.postList) {
                    this.postNewsList = data.postList;
                }
            });
            this.httpService.reqeustApiget('imageSoGao').subscribe((data: any) => {
                if (data.imageQCSoGao) {
                    this.sogao = data.imageQCSoGao;
                }
            });
            this.httpService.reqeustApiget('banner').subscribe((data: any) => {
                if (data.bannerList) {
                    this.bannerList = data.bannerList;
                }
                this.httpService.reqeustApiget('bannerMiddlePage').subscribe((data: any) => {
                    if (data.banner) {
                        this.bannerMiddlePage = data.banner;
                    }
                });
                this.httpService.reqeustApiget('partner').subscribe((data: any) => {
                    if (data.partnerList) {
                        this.partnerList = [...data.partnerList, ...data.partnerList];
                    }
                    this.showLoadingDialog('off');
                });
            });
        });

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

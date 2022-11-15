import { Component, HostListener, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-produdctionSystem',
    templateUrl: './produdctionSystem.component.html',
    styleUrls: ['./produdctionSystem.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProdudctionSystemComponent implements OnInit {

    @ViewChild('content', { static: false }) content!: ElementRef;
    isMobile: boolean = false;
    produdctionSystem: any;
    awardList = [];
    images = [
        "../../../../assets/image/main/ms_banner_img1.jpg",
        "../../../../assets/image/main/ms_banner_img2.jpg",
        "../../../../assets/image/main/ms_banner_img4.jpg"
    ]

    banner: any = {
        image: '../../../../assets/image/main/gat-lua-ruoi-hai-phong-vu-thang-6.jpg'
    }

    responsiveOptions = [
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

    constructor(private httpService: HttpService) { }

    ngOnInit() {

        this.httpService.reqeustApiget('banner').subscribe((data: any) => {
            if (data.bannerList) {
                this.banner = data.bannerList[0];
            }
        });

        this.httpService.reqeustApiget('award').subscribe((data: any) => {
            if (data.awards) {
                this.awardList = data.awards;
            }
        });

        this.httpService.reqeustApiget('posts', 'menuCode=he-thong-san-xuat-va-quan-ly&pageIndex=1&pageSize=1').subscribe((data: any) => {
            if (data.postList) {
                this.produdctionSystem = data.postList[0];
                this.content.nativeElement.innerHTML = this.produdctionSystem.postContent;
            }
        });

        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    @HostListener('window: resize', ['$event'])
    resizeable(event: any) {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

}

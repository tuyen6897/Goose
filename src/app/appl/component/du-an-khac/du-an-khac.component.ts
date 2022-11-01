import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'du-an-khac',
    templateUrl: 'du-an-khac.component.html',
    styleUrls: ['du-an-khac.component.scss']
})
export class DuAnKhacComponent extends ComponentBaseComponent implements OnInit{
    isShow = true;

    images = [1, 2, 3, 4];

    postList = [];

    tintucList = [
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png'
    ]

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

    constructor(private httpService: HttpService) {
        super(new MessageService);
    }

    ngOnInit() {
        // this.showDialog('on');
        // this.httpService.reqeustApiget('posts').subscribe((response: any) => {
        //     this.postList = response.postList;
        //     console.log(response.postList);
        //     this.postList.forEach((item: any) => {
        //         item.postImage = 'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png';
        //     });
        //     // if (this.postList.length <= 12) {
        //     //     this.isShowButton = true;
        //     // }
        //     // this.isShowButton = this.postList.length <= 12 ? false : true;
        //     this.showDialog('off');
        // });
    }
}

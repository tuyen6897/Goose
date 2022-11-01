import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/common/service/http-service';
@Component({
    selector: 'app-tintuc',
    templateUrl: './tintuc.component.html',
    styleUrls: ['./tintuc.component.css'],
})
export class TintucComponent implements OnInit {

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


    featuredNews: any[] = [];

    baochiList = [

    ]

    tintucList = [
        {
            image: '//file.hstatic.net/200000170631/article/thiet_ke_khong_ten_5189ee5e2e4c4927978ca7849ff91d74_large.png'
        },
        {
            image: '//file.hstatic.net/200000170631/article/thiet_ke_khong_ten_5189ee5e2e4c4927978ca7849ff91d74_large.png'
        },
        {
            image: '//file.hstatic.net/200000170631/article/thiet_ke_khong_ten_5189ee5e2e4c4927978ca7849ff91d74_large.png'
        },
        {
            image: '//file.hstatic.net/200000170631/article/thiet_ke_khong_ten_5189ee5e2e4c4927978ca7849ff91d74_large.png'
        },
        {
            image: '//file.hstatic.net/200000170631/article/thiet_ke_khong_ten_5189ee5e2e4c4927978ca7849ff91d74_large.png'
        },
        {
            image: '//file.hstatic.net/200000170631/article/thiet_ke_khong_ten_5189ee5e2e4c4927978ca7849ff91d74_large.png'
        }
    ]
    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=10').subscribe((response: any) => {
            response.postList.forEach((item: any) => {
                item.url = `${window.location.origin}/blogs?tin-tuc=${item.postName}`;
            })
            this.featuredNews = response.postList;
            this.baochiList = response.postList;
        });
    }

}

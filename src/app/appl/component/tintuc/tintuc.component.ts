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

    baochiList = [
        { image: '//file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885_large.jpg' },
        { image: '//file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885_large.jpg' },
        { image: '//file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885_large.jpg' },
        { image: '//file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885_large.jpg' },
        { image: '//file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885_large.jpg' }
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
        this.httpService.reqeustApiget('posts').subscribe(response => {
            console.log(response);
        });
    }

}

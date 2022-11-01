import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'trang-chu-du-an',
    templateUrl: 'trang-chu-du-an.component.html',
    styleUrls: ['trang-chu-du-an.component.scss']
})
export class TrangChuDuAnComponent implements OnInit {
    isShow: boolean = false;
    isShowBtn: boolean = true;
    tintucList = [
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png'
    ]

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.reqeustApiget('posts', 'menuCode=danh-sach-du-an&pageIndex=1&pageSize=10').subscribe((data: any) => {
            if (data.postList) {
                this.tintucList = data.postList;
            }
        })
    }
}

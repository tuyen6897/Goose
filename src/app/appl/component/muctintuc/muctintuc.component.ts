import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-muctintuc',
    templateUrl: './muctintuc.component.html',
    styleUrls: ['./muctintuc.component.css']
})
export class MuctintucComponent extends ComponentBaseComponent implements OnInit {

    isShow: boolean = false;
    isShowButton: boolean = false;
    tintucList = [
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png'
    ];

    postList = [];



    baochiList = [
        'https://file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885.jpg',
        'https://file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885.jpg',
        'https://file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885.jpg',
        'https://file.hstatic.net/200000170631/article/ngong-tren-bao-nong-nghiep-viet-nam_784163604a1a4abcab95470302e0c885.jpg',
    ]

    constructor(private httpService: HttpService) {
        super(new MessageService);
    }

    ngOnInit() {
        this.showDialog('on');
        this.httpService.reqeustApiget('posts').subscribe((response: any) => {
            this.postList = response.postList;
            console.log(response.postList);
            this.postList.forEach((item: any) => {
                item.postImage = 'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png';
            });
            if (this.postList.length <= 12) {
                this.isShowButton = true;
            }
            this.isShowButton = this.postList.length <= 12 ? false : true;
            this.showDialog('off');
        });
    }

    detailPost(id: string) {
        window.open(`${window.location.origin}/chi-tiet-tin-tuc?code=${id}`, "_self");
    }

}

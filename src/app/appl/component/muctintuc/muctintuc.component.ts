import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-muctintuc',
    templateUrl: './muctintuc.component.html',
    styleUrls: ['./muctintuc.component.css']
})
export class MuctintucComponent extends ComponentBaseComponent implements OnInit {


    @ViewChild('showDescription', { static: true }) showDescription!: ElementRef;
    @ViewChild('hideDescription', { static: true }) hideDescription!: ElementRef;
    isShow: boolean = false;
    isShowButton: boolean = false;
    postName = '';
    postDescription: any = '';
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
    postAllList = [];
    postList = [];



    baochiList: any = [
    ]

    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }

    ngOnInit() {
        this.showLoadingDialog('on');

        this.postName = window.location.pathname.split('/')[1];
        const param = `menuCode=${this.postName}&pageIndex=1&pageSize=1000`;
        this.httpService.reqeustApiget('posts', param).subscribe((response: any) => {
            if (response.postList) {
                this.postAllList = response.postList;
                this.postList = response.postList.slice(0, 12);
                // this.showDescription.nativeElement.innerHTML = response.description;
                // this.hideDescription!.nativeElement.innerHTML = response.description;
                if (response.postList) {
                    if (this.postList.length <= 12) {
                        this.isShowButton = true;
                    }
                    this.isShowButton = this.postList.length <= 12 ? false : true;
                }
            }
            this.httpService.reqeustApiget('posts', 'menuCode=bao-chi-noi-gi-ve-ngong&pageIndex=1&pageSize=4').subscribe((data: any) => {
                if (data.postList) {
                    this.baochiList = data.postList;
                    this.baochiList.forEach((item: any) => {
                        item.url = `${window.location.origin}/blogs?bao-chi-noi-gi-ve-ngong=${item.slug}`;
                    })
                }
                this.showLoadingDialog('off');
            });
        });
    }

    showOnClick() {
        this.postList = this.postAllList;
    }

    detailPost(id: string) {

        window.open(`${window.location.origin}/blogs?${this.postName}=${id}`, "_self");
    }

}

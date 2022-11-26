import { Component, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';
@Component({
    selector: 'app-tintuc',
    templateUrl: './tintuc.component.html',
    styleUrls: ['./tintuc.component.css'],
})
export class TintucComponent extends ComponentBaseComponent implements OnInit {

    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    featuredNews: any[] = [];
    banner: any = null;
    baochiList = [
    ]
    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2)
    }

    ngOnInit() {
        this.showLoadingDialog('on');

        this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=10').subscribe((response: any) => {
            if (response.postList) {
                response.postList.forEach((item: any) => {
                    item.url = `${window.location.origin}/blogs?tin-tuc=${item.slug}`;
                    item.postDate = Utils.timeStempToDateFormat(item.postDate);
                })
                this.featuredNews = response.postList;
                this.showLoadingDialog('off');
            }
        });

        this.httpService.reqeustApiget('posts', 'menuCode=bao-chi-noi-gi-ve-ngong&pageIndex=1&pageSize=10').subscribe((response: any) => {
            if (response.postList) {
                response.postList.forEach((item: any) => {
                    item.url = `${window.location.origin}/blogs?bao-chi-noi-gi-ve-ngong=${item.slug}`;
                })
                this.baochiList = response.postList;
                this.showLoadingDialog('off');
            }
        });
    }

}

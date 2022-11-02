import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';

@Component({
    selector: 'app-chitiettintuc',
    templateUrl: './chitiettintuc.component.html',
    styleUrls: ['./chitiettintuc.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ChitiettintucComponent extends ComponentBaseComponent implements OnInit {
    @ViewChild('content', { static: true }) content!: ElementRef;
    listTinTuc: any = [];
    post: any;
    topPost: any[] = [];
    postRelated: any[] = [];
    constructor(private httpService: HttpService) {
        super(new MessageService);
    }

    ngOnInit() {
        this.showDialog('on');
        let params = null;
        const sub = window.location.search.split('=')[0];
        if (sub === '?tin-tuc') {
            params = 'menuCode=tin-tuc&pageIndex=1&pageSize=1000';
        }
        if (sub === '?chuyen-ngong') {
            params = 'menuCode=chuyen-ngong&pageIndex=1&pageSize=1000';
        }
        if (sub === '?chuyen-vuon') {
            params = 'menuCode=chuyen-vuon&pageIndex=1&pageSize=1000';
        }
        if (sub === '?chuyen-xuong') {
            params = 'menuCode=chuyen-xuong&pageIndex=1&pageSize=1000';
        }
        if (sub === '?chuyen-tieu-dung') {
            params = 'menuCode=chuyen-tieu-dung&pageIndex=1&pageSize=1000';
        }
        const name = window.location.search.split('=')[1];
        this.httpService.reqeustApiget('posts', params).subscribe((response: any) => {
            console.log(response.postList);
            if (response.postList) {
                this.post = (response.postList as []).find(x => x['postName'] === name);
                this.listTinTuc = response.postList.slice(0, 10);
                this.post.postDate = Utils.timeStempToDateFormat(this.post.postDate);
                this.content.nativeElement.innerHTML = this.post.postContent;
                this.postRelated = (response.postList as []).filter(x => x['postName'] !== name).slice(0, 4);
                this.postRelated.forEach((item: any) => {
                    item.url = `${window.location.origin}/blogs${sub}=${item.postName}`;
                });
            };
            this.showDialog('off');
        });

        this.httpService.reqeustApiget('topPost', params).subscribe((response: any) => {
            if (response.postList) {
                response.postList.forEach((item: any) => {
                    item.url = `${window.location.origin}/blogs?tin-tuc=${item.postName}`;
                });
                this.topPost = response.postList;
            }
        });
    }

}

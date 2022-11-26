import { Component, OnInit, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'tuyen-dung-new',
    templateUrl: 'tuyen-dung-new.component.html',
    styleUrls: ['tuyen-dung-new.component.scss']
})
export class TuyenDungNewComponent extends ComponentBaseComponent implements OnInit {
    isShow: boolean = false;
    isShowBtn: boolean = true;
    tuyenDungNews: any = null;
    tuyenDungList: any = null;
    listTinTuc: any[] = [];
    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2)
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('tuyenDungNews').subscribe((data: any) => {
            if (data.tuyenDungNews) {
                this.tuyenDungNews = data.tuyenDungNews;
            }
            this.showLoadingDialog('off');
        });
        this.httpService.reqeustApiget('posts', 'menuCode=tuyen-dung&pageIndex=1&pageSize=100').subscribe((data: any) => {
            if (data.postList) {
                this.tuyenDungList = data.postList;
                this.tuyenDungList.forEach((item: any) => {
                    item.url = `/chi-tiet-tuyen-dung?name=${item.slug}`;
                })
            }
            this.showLoadingDialog('off');
        });
        this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=10').subscribe((data: any) => {
            if (data.postList) {
                this.listTinTuc = data.postList;
            }
        });
    }
}

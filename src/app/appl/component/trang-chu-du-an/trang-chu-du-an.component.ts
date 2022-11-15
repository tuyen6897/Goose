import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { Utils } from 'src/app/common/util/utils';

@Component({
    selector: 'trang-chu-du-an',
    templateUrl: 'trang-chu-du-an.component.html',
    styleUrls: ['trang-chu-du-an.component.scss']
})
export class TrangChuDuAnComponent extends ComponentBaseComponent implements OnInit {
    isShow: boolean = false;
    isShowBtn: boolean = true;
    projectList: any[] = [];
    tintucList: any[] = [

    ]

    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2)
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('projects').subscribe((data: any) => {
            if (data.projectList) {
                data.projectList.forEach((item: any) => {
                    let path = '';
                    if (String(item.name).toLowerCase() !== 'chuyến đi của ngỗng') {
                        path = `du-an?name=${Utils.removeAccents(String(item.name)).toLowerCase().split(' ').join('-')}`;
                    } else {
                        path = `chuyen-di-cua-ngong`;
                    }
                    item.url = `${window.location.origin}/${path}`;
                });

                this.projectList = data.projectList;
            }
            this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=1000').subscribe((data: any) => {
                if (data.postList) {
                    this.tintucList = data.postList;
                    this.tintucList.forEach((item: any) => {
                        item.url = `${window.location.origin}/blogs?tin-tuc=${item.slug}`;
                    });
                }
                this.showLoadingDialog('off');
            });
        })
    }

    goToProject(url: any) {
        window.open(url, "_self");
    }
}

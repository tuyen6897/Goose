import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'chinh-sach-dai-ly-ctv',
    templateUrl: 'chinh-sach-dai-ly-ctv.component.html',
    styleUrls: ['chinh-sach-dai-ly-ctv.component.scss']
})
export class ChinhSachDaiLyCtvComponent extends ComponentBaseComponent implements OnInit {
    @ViewChild('content', { static: true }) content!: ElementRef;
    rightBanner: any = null;
    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }
    ngOnInit(): void {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('posts', 'menuCode=chinh-sach-dai-ly-ctv&pageIndex=1&pageSize=1').subscribe((response: any) => {
            if (response.postList) {
                this.content.nativeElement.innerHTML = response.postList[0].postContent;
            }
            this.httpService.reqeustApiget('rightBanner').subscribe((data: any) => {
                if (data.banner) {
                    this.rightBanner = data.banner;
                    this.showLoadingDialog('off');
                }

            });
        });
    }

}

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
    listTinTuc = [
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
    ]
    post: any;
    constructor(private httpService: HttpService) {
        super(new MessageService);
    }

    ngOnInit() {
        this.showDialog('on');
        const id = window.location.search.split('?code=')[1];
        this.httpService.reqeustApiget('posts').subscribe((response: any) => {
            console.log(response.postList);
            this.post = (response.postList as []).find(x => x['id'] === +(id));
            this.post.postDate = Utils.timeStempToDateFormat(this.post.postDate);
            this.content.nativeElement.innerHTML = this.post.postContent;
            this.showDialog('off');
        });
    }

}

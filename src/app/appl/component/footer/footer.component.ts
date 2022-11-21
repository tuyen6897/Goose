import { Component, OnInit, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent extends ComponentBaseComponent implements OnInit {

    isMobile: boolean = false;
    footer: any = null;
    buyList: any[] = [];
    // @ViewChild('fbPage', { static: false }) fbPage!: ElementRef;
    constructor(ele: ElementRef, private rend: Renderer2, private httpService: HttpService) {
        super(new MessageService, rend);
    }

    ngOnInit() {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        }

        this.httpService.reqeustApiget('footer').subscribe((data: any) => {
            if (data) {
                this.footer = data.footer;
                // this.fbPage.nativeElement.innerHTML = this.footer.fbConnect;
                this.footer.buyWhere.content.forEach((item: any) => {
                    if (item.list.length) {
                        this.buyList = item.list;
                    }
                })
            }
        });
    }

    @HostListener('window: resize', ['$event'])
    resizeable(event: any) {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

}

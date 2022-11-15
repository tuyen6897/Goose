import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('boxtintuc', { static: false }) boxtintuc!: ElementRef;
    @ViewChild('boxbaiviet', { static: false }) boxbaiviet!: ElementRef;
    @ViewChild('footer', { static: false }) footer!: FooterComponent;
    listTinTuc: any[] = [
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
        { postTitle: 'Mật trà Kombucha thảo mộc 500ml' },
    ];
    newsList: any[] = [];
    newsAllList: any[] = [];
    isShow: boolean = false;
    rightBanner: any = null;
    constructor(
        private render2: Renderer2,
        private httpService: HttpService
    ) {
        super(new MessageService, render2);
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('posts', 'menuCode=bao-chi-noi-gi-ve-ngong&pageIndex=1&pageSize=100').subscribe((data: any) => {
            if (data.postList) {
                this.newsAllList = data.postList;
                this.newsAllList.forEach((item: any) => {
                    item.url = `${window.location.origin}/blogs?bao-chi-noi-gi-ve-ngong=${item.slug}`;
                });
                this.newsList = data.postList.slice(0, 4);
                if (this.newsAllList.length > 4) {
                    this.isShow = true;
                }
                this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=10').subscribe((data: any) => {
                    if (data.postList) {
                        this.listTinTuc = data.postList;
                    }
                    this.httpService.reqeustApiget('rightBanner').subscribe((data: any) => {
                        if (data.banner) {
                            this.rightBanner = data.banner;
                            this.showLoadingDialog('off');
                        }

                    });
                });

            }
        });
    }

    showNews() {
        this.newsList = this.newsAllList;
        this.isShow = false;
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        const boxNewsBound = this.boxtintuc.nativeElement.getBoundingClientRect();
        const boxbaivietBound = this.boxbaiviet.nativeElement.getBoundingClientRect();
        const footerBound = document.querySelector('app-footer')!.getBoundingClientRect();
        if ((boxNewsBound.top + boxNewsBound.height) <= 100) {
            this.render2.setStyle(this.boxbaiviet.nativeElement, 'position', 'absolute');
            this.render2.setStyle(this.boxbaiviet.nativeElement, 'top', `${window.scrollY + 100}px`);
            this.render2.addClass(this.boxbaiviet.nativeElement, 'box-stick');
        } else {
            this.render2.removeStyle(this.boxbaiviet.nativeElement, 'position');
            this.render2.removeClass(this.boxbaiviet.nativeElement, 'box-stick');
        }

        if (footerBound.top < boxbaivietBound.height + 100) {
            this.render2.removeStyle(this.boxbaiviet.nativeElement, 'position');
            this.render2.removeClass(this.boxbaiviet.nativeElement, 'box-stick');
        }
    }

    onClicktintuc(slug: any) {
        window.open(`${window.location.origin}/blogs?tin-tuc=${slug}`, "_self");
    }

}

import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { HttpService } from 'src/app/common/service/http-service';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    @ViewChild('boxtintuc', { static: false }) boxtintuc!: ElementRef;
    @ViewChild('boxbaiviet', { static: false }) boxbaiviet!: ElementRef;
    @ViewChild('footer', { static: false }) footer!: FooterComponent;
    listTinTuc: any[] = [
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
    ];
    newsList: any[] = [];

    constructor(
        private render: Renderer2,
        private httpService: HttpService
    ) { }

    ngOnInit() {
        this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=10').subscribe((data: any) => {
            if (data.postList) {
                this.listTinTuc = data.postList;
            }
        });

        this.httpService.reqeustApiget('posts', 'menuCode=bao-chi&pageIndex=1&pageSize=10').subscribe((data: any) => {
            if (data.postList) {
                this.newsList = data.postList;
            }
        });
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        const boxNewsBound = this.boxtintuc.nativeElement.getBoundingClientRect();
        const boxbaivietBound = this.boxbaiviet.nativeElement.getBoundingClientRect();
        const footerBound = document.querySelector('app-footer')!.getBoundingClientRect();
        if ((boxNewsBound.top + boxNewsBound.height) <= 100) {
            this.render.setStyle(this.boxbaiviet.nativeElement, 'position', 'absolute');
            this.render.setStyle(this.boxbaiviet.nativeElement, 'top', `${window.scrollY + 100}px`);
            this.render.addClass(this.boxbaiviet.nativeElement, 'box-stick');
        } else {
            this.render.removeStyle(this.boxbaiviet.nativeElement, 'position');
            this.render.removeClass(this.boxbaiviet.nativeElement, 'box-stick');
        }

        if (footerBound.top < boxbaivietBound.height + 100) {
            this.render.removeStyle(this.boxbaiviet.nativeElement, 'position');
            this.render.removeClass(this.boxbaiviet.nativeElement, 'box-stick');
        }
    }

}

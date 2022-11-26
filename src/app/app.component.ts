import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService],
})
export class AppComponent implements OnInit, AfterViewInit {


    constructor(private messageService1: MessageService) {
        window.scrollTo(0, 0);
    }
    isHiden = true;
    ngOnInit(): void {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        this.isHiden = window.scrollY ? true : false;
    }

    backTopClick() {
        window.scrollTo(0, 0);
    }

}

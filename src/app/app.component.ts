import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService],
})
export class AppComponent implements OnInit {


    constructor(private messageService1: MessageService) {
    }
    isHiden = true;
    ngOnInit(): void {
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        this.isHiden = window.scrollY ? true : false;
        // console.log(window.scrollY);
    }

    backTopClick() {
        window.scrollTo(0, 0);
    }

}

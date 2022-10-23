import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from './common/componentBase/componentBase.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService],
})
export class AppComponent extends ComponentBaseComponent implements OnInit {


    constructor(private messageService1: MessageService) {
        super(messageService1);
    }
    isHiden = true;
    ngOnInit(): void {
        this.showMessage();
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        this.isHiden = window.scrollY ? true : false;
        // console.log(window.scrollY);
        this.showMessage();
    }

    backTopClick() {
        window.scrollTo(0, 0);
    }

}

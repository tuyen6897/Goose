import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-lienhe',
    templateUrl: './lienhe.component.html',
    styleUrls: ['./lienhe.component.css']
})
export class LienheComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('note', { static: false }) note!: ElementRef;
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    constructor(public httpService: HttpService, private rer: Renderer2) {
        super(new MessageService, rer);
    }

    ngOnInit() {

    }

    registOnClick() {
        this.showDialog('on');
        this.httpService.reqeustApiPost('ask-question', {
            name: this.name.nativeElement.value,
            phone: this.phone.nativeElement.value,
            email: this.email.nativeElement.value,
            content: this.note.nativeElement.value
        }).subscribe((data) => {
            if (data) {
                this.header.showMessage('success', '', 'Gửi câu hỏi thành công.');
            }
            this.showDialog('off');

        })
    }

}

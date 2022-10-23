import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-componentBase',
    templateUrl: './componentBase.component.html',
    styleUrls: ['./componentBase.component.css'],
    providers: [MessageService],
})
export class ComponentBaseComponent {

    constructor(private messageService: MessageService) { }

    showMessage(severity: string = 'info', summary: string = 'Info', message: string = 'Message') {
        this.messageService.add({
            key: 'tc',
            severity: severity,
            summary: summary,
            detail: message,
        });
    }

    showDialog(flag: string = '') {
        const dialog: any = document.body.querySelector('#printLoadMask');
        if (dialog) {
            switch (flag) {
                case 'on':
                    dialog.style.display = 'flex';
                    break;
                case 'off':
                    dialog['style'].display = 'none';
                    break;
                default:
                    dialog.style.display = 'none'
                    break;
            }
        }
    }

}

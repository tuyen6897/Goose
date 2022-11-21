import { Component, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-componentBase',
    templateUrl: './componentBase.component.html',
    styleUrls: ['./componentBase.component.css'],
    providers: [MessageService],
})
export class ComponentBaseComponent {

    constructor(private messageService: MessageService, private render: Renderer2) { }

    showMessage(severity: string = 'info', summary: string = 'Info', message: string = 'Message') {
        this.messageService.add({
            key: 'tc',
            severity: severity,
            summary: summary,
            detail: message,
        });
    }

    showDialog(flag: string = '') {
        const dialog: any = document.querySelector('#printLoadMask');
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

    showLoadingDialog(flag: string = '') {
        const dialog: any = document.querySelector('#printLoadMask');
        if (dialog) {
            switch (flag) {
                case 'on':
                    dialog.style.display = 'flex';
                    this.render.addClass(dialog, 'loading_mask_init');
                    this.render.setStyle(document.body, 'overflow', 'hidden');
                    break;
                case 'off':
                    dialog['style'].display = 'none';
                    this.render.removeClass(dialog, 'loading_mask_init');
                    this.render.removeStyle(document.body, 'overflow');
                    break;
                default:
                    dialog.style.display = 'none';
                    this.render.removeClass(dialog, 'loading_mask_init');
                    this.render.removeStyle(document.body, 'overflow');
                    break;
            }
        }
    }

    addCartAccount(item: any) {

    }

    getAccount() {
        const account = JSON.parse(sessionStorage.getItem("account") as any);
        return account;
    }

}

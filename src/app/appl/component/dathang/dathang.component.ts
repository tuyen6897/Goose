import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-dathang',
    templateUrl: './dathang.component.html',
    styleUrls: ['./dathang.component.scss'],
    providers: [DialogService]
})
export class DathangComponent implements OnInit {

    product: any;
    ref!: DynamicDialogRef;
    constructor(private router: Router,
        private dialogService: DialogService) { }

    ngOnInit() {
        this.product = JSON.parse(sessionStorage.getItem("productList") as any);
    }

    formatCash(str: string) {
        str = String(str);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    openDialogLogin(login = false): void {
        this.router.navigate(['']);
        this.ref = this.dialogService.open(LoginComponent, {
            width: '30%',
            contentStyle: { "height": "auto", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                login: login
            }
        });
    }


}

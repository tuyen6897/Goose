import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'voucher',
    templateUrl: 'voucher.component.html',
    styleUrls: ['voucher.component.scss']
})
export class VoucherComponent implements OnInit {
    constructor(private ref: DynamicDialogRef) { }

    ngOnInit() {
    }

    summit() {
        this.ref.close();
    }
}

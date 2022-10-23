import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-commentDialog',
    templateUrl: './commentDialog.component.html',
    styleUrls: ['./commentDialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

    constructor(private ref: DynamicDialogRef) { }

    ngOnInit() {
    }

    summit() {
        this.ref.close();
    }

}

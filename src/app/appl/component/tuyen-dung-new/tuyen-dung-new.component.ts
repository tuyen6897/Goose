import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tuyen-dung-new',
    templateUrl: 'tuyen-dung-new.component.html',
    styleUrls: ['tuyen-dung-new.component.scss']
})
export class TuyenDungNewComponent implements OnInit{
    isShow: boolean = false;
    isShowBtn: boolean = true;

    constructor() { }

    ngOnInit() {
    }
}

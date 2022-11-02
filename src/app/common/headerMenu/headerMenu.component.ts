import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-headerMenu',
    templateUrl: './headerMenu.component.html',
    styleUrls: ['./headerMenu.component.css']
})
export class HeaderMenuComponent implements OnInit {

    @Input() slide = false;
    visibleSidebar2: boolean = false;
    @Output() cartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() accountClick: EventEmitter<any> = new EventEmitter<any>();
    searchBox: boolean = false;
    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    onCartClick(event: any) {
        this.cartClick.emit();
    }

    onAccountClick(event: any) {
        this.accountClick.emit(event);
    }

    onClick(){
        this.router.navigate(['gio-hang']);
    }
}

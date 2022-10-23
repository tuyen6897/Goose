import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    isMobile: boolean = false;
    constructor() { }

    ngOnInit() {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        }
    }

    @HostListener('window: resize', ['$event'])
    resizeable(event: any) {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

}

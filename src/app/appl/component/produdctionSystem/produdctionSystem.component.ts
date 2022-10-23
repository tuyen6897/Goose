import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-produdctionSystem',
    templateUrl: './produdctionSystem.component.html',
    styleUrls: ['./produdctionSystem.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProdudctionSystemComponent implements OnInit {
    isMobile: boolean = false;
    rewardList = [
        'Giải thưởng 1',
        'Giải thưởng 1',
        'Giải thưởng 1',
        'Giải thưởng 1',
    ];
    images = [
        "../../../../assets/image/main/ms_banner_img1.jpg",
        "../../../../assets/image/main/ms_banner_img2.jpg",
        "../../../../assets/image/main/ms_banner_img4.jpg"
    ]

    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor() { }

    ngOnInit() {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
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

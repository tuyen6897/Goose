import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'du-an-khac',
    templateUrl: 'du-an-khac.component.html',
    styleUrls: ['du-an-khac.component.scss']
})
export class DuAnKhacComponent implements OnInit{
    numVisible: number = 0;

    isShow = true;

    tintucList = [
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png'
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

    imagetrademark = [
        {
            image: "../../../../assets/image/icons/hteamus_3.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_2.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_5.png"
        },
        {
            image: "../../../../assets/image/icons/hteamus_7.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_9.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_3.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_2.webp"
        },
        {
            image: "../../../../assets/image/icons/hteamus_5.png"
        },
        {
            image: "../../../../assets/image/icons/hteamus_7.webp"
        }
    ]

    constructor(
    ) {
        this.numVisible = 6;
    }
    ngOnInit() {

    }

    chooseform1(){
        this.isShow = true;
    }

    chooseform2(){
        this.isShow = false;
    }
}

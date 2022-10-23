import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare let $: any;

@Component({
    selector: 'chuyen-di-cua-ngong',
    templateUrl: 'chuyen-di-cua-ngong.component.html',
    styleUrls: ['chuyen-di-cua-ngong.component.scss']
})
export class ChuyenDiCuaNgongComponent {
    numVisible: number = 0;

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
    
    constructor(
        private scroller: ViewportScroller, 
        private router: Router,
    ) {
        this.numVisible = 6;
    }
    ngOnInit() {

    }

    imagesProductWatch = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp'
    ]

    tintucList = [
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png',
        'https://file.hstatic.net/200000170631/article/logo_ngong__600_x_375__29344ad4b48045eea1b44ff92fc8af04_large.png'
    ]

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

    onScroll(){
        this.scroller.scrollToAnchor("SECTION6");
    }

    addNewElement(){
        var cointainer = $('#btntest').closest('.add-dele');
        var counts = cointainer.children('.gradient-border').length;
        var content = $('#btntest').prev();

        counts++;
        if (counts > 4) {
            $('#btntest').hide();
        }

        content.clone(true,true).insertAfter(content);
        cointainer.find('.removeBtn').show();
    }

    deleteNewElement(){
        var cointainer = $(this).closest('.add-dele');
        var counts = cointainer.children('.gradient-border').length;

        counts--;
        if(counts < 4) {
            cointainer.children('.addBtn').show();
            if (counts == 1) {
                cointainer.find('.removeBtn').hide();
            }
        }
        
        $(this).parent().remove();
    }
}

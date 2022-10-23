import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'he-thong-doi-tac-new',
    templateUrl: 'he-thong-doi-tac-new.component.html',
    styleUrls: ['he-thong-doi-tac-new.component.scss']
})
export class HeThongDoiTacNewComponent {
    @ViewChild('home', { static: false }) home!: ElementRef;
    @ViewChild('foodmap', { static: false }) foodmap!: ElementRef;
    @ViewChild('homefood', { static: false }) homefood!: ElementRef;
    @ViewChild('saphang', { static: false }) saphang!: ElementRef;
    @ViewChild('tamdat', { static: false }) tamdat!: ElementRef;
    constructor(
        private rend: Renderer2
    ) { }

    ngOnInit() {
    }

    onChangeFoodmap() {
        this.rend.removeStyle(this.foodmap.nativeElement, 'display');
        this.rend.setStyle(this.home.nativeElement, 'display', 'none');
        this.rend.setStyle(this.homefood.nativeElement, 'display', 'none');
        this.rend.setStyle(this.saphang.nativeElement, 'display', 'none');
        this.rend.setStyle(this.tamdat.nativeElement, 'display', 'none');
    }

    onChangeHomefood() {
        this.rend.removeStyle(this.homefood.nativeElement, 'display');
        this.rend.setStyle(this.home.nativeElement, 'display', 'none');
        this.rend.setStyle(this.foodmap.nativeElement, 'display', 'none');
        this.rend.setStyle(this.saphang.nativeElement, 'display', 'none');
        this.rend.setStyle(this.tamdat.nativeElement, 'display', 'none');
    }

    onChangeSaphang() {
        this.rend.removeStyle(this.saphang.nativeElement, 'display');
        this.rend.setStyle(this.home.nativeElement, 'display', 'none');
        this.rend.setStyle(this.foodmap.nativeElement, 'display', 'none');
        this.rend.setStyle(this.homefood.nativeElement, 'display', 'none');
        this.rend.setStyle(this.tamdat.nativeElement, 'display', 'none');
    }

    onChangeTamdat() {
        this.rend.removeStyle(this.tamdat.nativeElement, 'display');
        this.rend.setStyle(this.home.nativeElement, 'display', 'none');
        this.rend.setStyle(this.foodmap.nativeElement, 'display', 'none');
        this.rend.setStyle(this.homefood.nativeElement, 'display', 'none');
        this.rend.setStyle(this.saphang.nativeElement, 'display', 'none');
    }
}

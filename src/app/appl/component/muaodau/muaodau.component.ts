import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-muaodau',
    templateUrl: './muaodau.component.html',
    styleUrls: ['./muaodau.component.css']
})
export class MuaodauComponent implements OnInit, AfterViewInit {

    @ViewChild('home', { static: false }) home!: ElementRef;
    @ViewChild('foodmap', { static: false }) foodmap!: ElementRef;
    @ViewChild('homefood', { static: false }) homefood!: ElementRef;
    @ViewChild('saphang', { static: false }) saphang!: ElementRef;
    @ViewChild('tamdat', { static: false }) tamdat!: ElementRef;
    @ViewChild('tinh', { static: false }) tinh!: ElementRef;
    @ViewChild('quan', { static: false }) quan!: ElementRef;
    isHn = false;
    isSg = false;
    constructor(
        private rend: Renderer2
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (!this.tinh.nativeElement.selectedIndex && !this.quan.nativeElement.selectedIndex) {
            this.isHn = true;
            this.isSg = true;
        }
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

    tinhChange(event: any) {
        if (!this.quan.nativeElement.selectedIndex) {
            if (!event.target.selectedIndex) {
                this.isHn = true;
                this.isSg = true;
            } else if (event.target.selectedIndex === 1) {
                this.isHn = true;
                this.isSg = false;
            } else {
                this.isHn = false;
                this.isSg = true;
            }
        } else {
            this.isHn = false;
            this.isSg = false;
        }

    }

    quanChange(event: any) {
        if (!this.quan.nativeElement.selectedIndex) {
            if (!event.target.selectedIndex) {
                this.isHn = true;
                this.isSg = true;
            } else if (event.target.selectedIndex === 1) {
                this.isHn = true;
                this.isSg = false;
            } else {
                this.isHn = false;
                this.isSg = true;
            }
        } else {
            this.isHn = false;
            this.isSg = false;
        }
    }

}

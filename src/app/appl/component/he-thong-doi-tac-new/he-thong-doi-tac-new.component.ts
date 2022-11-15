import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'he-thong-doi-tac-new',
    templateUrl: 'he-thong-doi-tac-new.component.html',
    styleUrls: ['he-thong-doi-tac-new.component.scss']
})
export class HeThongDoiTacNewComponent extends ComponentBaseComponent implements AfterViewInit {
    @ViewChild('home', { static: false }) home!: ElementRef;
    @ViewChild('foodmap', { static: false }) foodmap!: ElementRef;
    @ViewChild('homefood', { static: false }) homefood!: ElementRef;
    @ViewChild('saphang', { static: false }) saphang!: ElementRef;
    @ViewChild('tamdat', { static: false }) tamdat!: ElementRef;
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('addr', { static: false }) addr!: ElementRef;
    @ViewChild('message', { static: false }) message!: ElementRef;
    @ViewChild('tinh', { static: false }) tinh!: ElementRef;
    @ViewChild('quan', { static: false }) quan!: ElementRef;
    isHn = false;
    isSg = false;
    constructor(
        private rend: Renderer2,
        private httpService: HttpService
    ) {
        super(new MessageService, rend);
    }

    ngAfterViewInit(): void {
        if (!this.tinh.nativeElement.selectedIndex && !this.quan.nativeElement.selectedIndex) {
            this.isHn = true;
            this.isSg = true;
        }
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

    registOnClick() {
        const params = {
            "name": this.name.nativeElement.value,
            "phone": this.phone.nativeElement.value,
            "email": this.email.nativeElement.value,
            "description": this.message.nativeElement.value
        };
        this.showDialog('on');
        this.httpService.reqeustApiPost('register-agent-ctv', params).subscribe((data: any) => {
            if (data) {
                this.header.showMessage('success', '', 'Đăng ký thành công.');
            }
            this.showDialog('off');
        });
    }
}

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';

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
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('addr', { static: false }) addr!: ElementRef;
    @ViewChild('message', { static: false }) message!: ElementRef;
    constructor(
        private rend: Renderer2,
        private httpService: HttpService
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

    registOnClick() {
        const params = {
            "name": this.name.nativeElement.value,
            "phone": this.phone.nativeElement.value,
            "email": this.email.nativeElement.value,
            "description": this.message.nativeElement.value
        };

        this.httpService.reqeustApiPost('register-agent-ctv', params).subscribe((data: any) => {
            if (data) {
                this.header.showMessage('success', '', 'Đăng ký thành công.');
            }
        });
    }
}

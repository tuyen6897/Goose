import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'chinh-sach-dai-ly-ctv',
    templateUrl: 'chinh-sach-dai-ly-ctv.component.html',
    styleUrls: ['chinh-sach-dai-ly-ctv.component.scss']
})
export class ChinhSachDaiLyCtvComponent extends ComponentBaseComponent implements OnInit {
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('content', { static: true }) content!: ElementRef;
    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('message', { static: false }) message!: ElementRef;
    @ViewChild('addr', { static: false }) addr!: ElementRef;
    @ViewChild('projectSelect', { static: false }) projectSelect!: ElementRef;
    rightBanner: any = null;
    mode: any = 0;
    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }
    ngOnInit(): void {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('posts', 'menuCode=chinh-sach-dai-ly-ctv&pageIndex=1&pageSize=1').subscribe((response: any) => {
            if (response.postList) {
                this.content.nativeElement.innerHTML = response.postList[0].postContent;
            }

            this.httpService.reqeustApiget('modeRegisterTrip').subscribe((data: any) => {
                this.mode = data.mode;
            });

            this.httpService.reqeustApiget('rightBanner').subscribe((data: any) => {
                if (data.banner) {
                    this.rightBanner = data.banner;
                    this.showLoadingDialog('off');
                }
            });
        });
    };

    registOnClick() {
        if (this.mode !== 0) {
            const params = {
                "name": this.name.nativeElement.value,
                "phone": this.phone.nativeElement.value,
                "email": this.email.nativeElement.value,
                "projectId": this.projectSelect.nativeElement.value,
                "feedback": this.message.nativeElement.value
            };
            this.showDialog('on');
            this.httpService.reqeustApiPost('register-project', params).subscribe((data: any) => {
                if (data) {
                    this.header.showMessage('success', '', 'Đăng ký thành công.');
                }
                this.showDialog('off');
            });
        } else {
            const params = {
                "name": this.name.nativeElement.value,
                "phone": this.phone.nativeElement.value,
                "email": this.email.nativeElement.value,
                "address": this.addr.nativeElement.value,
                "description": this.message.nativeElement.value
            };

            this.httpService.reqeustApiPost('register-trip', params).subscribe((data: any) => {
                if (data) {
                    this.header.showMessage('success', '', 'Đăng ký thành công.');
                }
            });
        }
    }

}

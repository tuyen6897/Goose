import { Component, ElementRef, OnInit, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'he-thong-doi-tac-new',
    templateUrl: 'he-thong-doi-tac-new.component.html',
    styleUrls: ['he-thong-doi-tac-new.component.scss']
})
export class HeThongDoiTacNewComponent extends ComponentBaseComponent implements OnInit, AfterViewInit {
    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('addr', { static: false }) addr!: ElementRef;
    @ViewChild('message', { static: false }) message!: ElementRef;
    @ViewChild('tinh', { static: false }) tinh!: ElementRef;
    @ViewChild('quan', { static: false }) quan!: ElementRef;
    cityAgentCTVList: any[] = [];
    agentCTVList: any[] = [];
    agentCTVListDisp: any[] = [];
    mapFlag = 0;
    constructor(
        private rend: Renderer2,
        private httpService: HttpService
    ) {
        super(new MessageService, rend);
    }

    ngOnInit(): void {
        this.httpService.reqeustApiget('agent').subscribe((data: any) => {
            if (data.cityAgentCTVList) {
                this.cityAgentCTVList = data.cityAgentCTVList;
                this.cityAgentCTVList.unshift({ id: 0, name: 'Tất cả tỉnh/thành' });
            }
            this.httpService.reqeustApiget('agentcity', '0').subscribe((data: any) => {
                if (data.agentCTVList) {
                    this.agentCTVList = data.agentCTVList;
                    this.agentCTVListDisp = [...this.agentCTVList];
                }
            });
        });
    }

    ngAfterViewInit(): void {
    }

    tinhChange(event: any) {
        const index = event.target.selectedIndex;
        if (index === 0) {
            this.agentCTVListDisp = [...this.agentCTVList];
        } else {
            this.agentCTVListDisp = [...this.agentCTVList.filter(x => x.cityAgenCTVId === index)];
        }
    }

    quanChange(event: any) {
    }

    onChangemap(value: any) {
        this.mapFlag = value;
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

import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-muaodau',
    templateUrl: './muaodau.component.html',
    styleUrls: ['./muaodau.component.css']
})
export class MuaodauComponent extends ComponentBaseComponent implements OnInit, AfterViewInit {

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

    ngOnInit() {
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

    ngAfterViewInit() {
    }

    onChangemap(value: any) {
        this.mapFlag = value;
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

}

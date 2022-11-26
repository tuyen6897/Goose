import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from "@angular/core";
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from "src/app/common/header/header.component";

@Component({
    selector: 'du-an-khac',
    templateUrl: 'du-an-khac.component.html',
    styleUrls: ['du-an-khac.component.scss']
})
export class DuAnKhacComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('header', { static: false }) header!: HeaderComponent;
    @ViewChild('name', { static: false }) name!: ElementRef;
    @ViewChild('phone', { static: false }) phone!: ElementRef;
    @ViewChild('email', { static: false }) email!: ElementRef;
    @ViewChild('message', { static: false }) message!: ElementRef;
    @ViewChild('projectSelect', { static: false }) projectSelect!: ElementRef;

    postsNewList: any[] = [1, 2, 3, 4];
    project: any = null;
    postList = [];
    projectList: any[] = [];
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
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('postsproject', 'canhDongSeChia').subscribe((data: any) => {
            this.project = data['canhDongSeChia'];
            this.showLoadingDialog('off');
        });
        this.httpService.reqeustApiPost('posts', 'menuCode=chuyen-di-cua-ngong&pageIndex=1&pageSize=1000').subscribe((data: any) => {
            if (data.postList) {
            }
            this.showLoadingDialog('off');
        });

        this.httpService.reqeustApiget('projects', '1').subscribe((data: any) => {
            if (data.projectList) {
                this.projectList = data.projectList;
                console.log(this.projectList);
            }
        });

        this.httpService.reqeustApiget('posts', 'menuCode=tin-tuc&pageIndex=1&pageSize=10').subscribe((data: any) => {
            if (data.postList) {
                this.postsNewList = data.postList;
            }
            this.showLoadingDialog('off');
        });
    }

    registOnClick() {
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
    }
}

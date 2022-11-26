import { Component, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'chi-tiet-tuyen-dung',
    templateUrl: 'chi-tiet-tuyen-dung.component.html',
    styleUrls: ['chi-tiet-tuyen-dung.component.scss']
})
export class ChiTietTuyenDungComponent extends ComponentBaseComponent implements OnInit {
    imagesProductSale = [
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',
        '../../../../assets/image/products/mat-tra-kombucha-cot-chuoi-500ml_0d0457c2e57048c0be7305d0953ae0f2_large.webp',

    ];
    rightBanner: any = null;
    tuyenDung: any = null;
    tuyenDungOther: any[] = [];
    constructor(private httpService: HttpService, private render2: Renderer2) {
        super(new MessageService, render2);
    }

    ngOnInit(): void {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('rightBanner').subscribe((data: any) => {
            if (data.banner) {
                this.rightBanner = data.banner;
                this.showLoadingDialog('off');
            }

        });
        this.httpService.reqeustApiget('posts', 'menuCode=tuyen-dung&pageIndex=1&pageSize=100').subscribe((data: any) => {
            const name = window.location.search.split('=')[1];
            if (data.postList) {
                this.tuyenDung = data.postList.find((x: any) => x['slug'] === name);
                this.tuyenDungOther = data.postList.filter((x: any) => x['slug'] !== name);
            }
            this.showLoadingDialog('off');
        });
    }
}

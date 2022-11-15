import { Component, HostListener, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComponentBaseComponent } from 'src/app/common/componentBase/componentBase.component';
import { HttpService } from 'src/app/common/service/http-service';

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IntroduceComponent extends ComponentBaseComponent implements OnInit {

    @ViewChild('content', { static: false }) content!: ElementRef;
    isMobile: boolean = false;
    awardList: any = [];
    banner: any = {
        imageUrl: '../../../../assets/image/main/gat-lua-ruoi-hai-phong-vu-thang-6.jpg'
    }
    introduce: any = null;

    formData = [
        {
            date: 'Trước năm 2018',
            title: 'TIỀN THÂN LÀ THÀNH VIÊN CỦA BETAVIET GROUP',
            content: 'Tổ đội thi công chính trong hệ thống Betaviet Group với hơn 10 năm kinh nghiệm thực hiện những công trình lớn và trọng điểm.',
            sub: '1'
        },
        {
            date: 'Năm 2018',
            title: 'THÀNH LẬP CÔNG TY CỔ PHẦN NỘI THẤT BETAGALAXY',
            content: 'thành lập Công ty CP Nội thất BetaGalaxy, thành lập phòng thiết kế, phòng thi công và tổ đội thi công xây lắp.',
            sub: '2'
        },
        {
            date: '2019',
            title: 'THÀNH LẬP XƯỞNG GỖ BETADECOR',
            content: `Thành lập xưởng gỗ Betadecor tại 98 Phố Mới, Đồng Nguyên, Từ Sơn, Bắc Ninh. Cuối năm
                                2019, thành
                                lập phân xưởng cơ khí Beta Phú Thịnh tại Quốc look 21, xã Hải Vân, huyện Hải Hậu, tỉnh
                                Nam Định.`,
            sub: '1'
        },
        {
            date: '2020',
            title: 'KHAI TRƯƠNG SHOWROOM NỘI THẤT GALAXY CENTER',
            content: `Đổi tên công ty thành công ty CP kiến trúc & nội thất Galaxy Centre & đầu tư showroom
                                Nội thất
                                cao cấp quy mô 5000m2 tại Tòa nhà Galaxy centre, KĐT Thanh Hà - Cienco5, Hà Đông, Hà
                                Nỗi.`,
            sub: '2'
        },
        {
            date: '2021 đến nay',
            title: 'MỞ RỘNG HOẠT ĐỘNG - PHÁT TRIỂN THỊ PHẦN',
            content: `Ngoài việc sản xuất nội thất trong nước, Galaxy Centre còn đây mạnh nhập khẩu các sản
                                phẩm cao
                                cấp từ Châu Âu và Trung Quốc. Galaxy Centre đã trở thành đại lý phân phối nội thất độc
                                quyền của
                                nhiều thương hiệu nổi tiếng thế gới như Longhi, Bentley Home, Giorgio Armani, Robert
                                Cavalli,
                                Cover House, Becattie,...`,
            sub: '1'
        }
    ];

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

    constructor(private httpService: HttpService, private rend: Renderer2) {
        super(new MessageService, rend);
    }

    ngOnInit() {
        this.showLoadingDialog('on');
        this.httpService.reqeustApiget('aboutNgong').subscribe((data: any) => {
            if (data) {
                this.introduce = data;
                this.content.nativeElement.innerHTML = this.introduce.soLuocVeNgong.moDau;
            }
            this.showLoadingDialog('off');
        });

        this.httpService.reqeustApiget('banner').subscribe((data: any) => {
            if (data.bannerList) {
                this.banner = data.bannerList[0];
            }
        });

        this.httpService.reqeustApiget('award').subscribe((data: any) => {
            if (data.awards) {
                this.awardList = data.awards;
            }
        });

        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    @HostListener('window: resize', ['$event'])
    resizeable(event: any) {
        if (window.innerWidth <= 991) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

}

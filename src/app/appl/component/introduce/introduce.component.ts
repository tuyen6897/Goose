import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IntroduceComponent implements OnInit {

    isMobile: boolean = false;
    images = [1, 2, 3, 4];

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

    ngOnInit() {
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

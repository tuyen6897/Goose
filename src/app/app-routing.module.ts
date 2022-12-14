import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './appl/component/account/account.component';
import { ChitietsanphamComponent } from './appl/component/chitietsanpham/chitietsanpham.component';
import { ChitiettintucComponent } from './appl/component/chitiettintuc/chitiettintuc.component';
import { ChuyenDiCuaNgongComponent } from './appl/component/chuyen-di-cua-ngong/chuyen-di-cua-ngong.component';
import { DanhmucsanphamComponent } from './appl/component/danhmucsanpham/danhmucsanpham.component';
import { DathangComponent } from './appl/component/dathang/dathang.component';
import { GiohangComponent } from './appl/component/giohang/giohang.component';
import { IntroduceComponent } from './appl/component/introduce/introduce.component';
import { LienheComponent } from './appl/component/lienhe/lienhe.component';
import { LoginComponent } from './appl/component/login/login.component';
import { MenuComponent } from './appl/component/menu/menu.component';
import { MuaodauComponent } from './appl/component/muaodau/muaodau.component';
import { MuctintucComponent } from './appl/component/muctintuc/muctintuc.component';
import { NewsComponent } from './appl/component/news/news.component';
import { ProdudctionSystemComponent } from './appl/component/produdctionSystem/produdctionSystem.component';
import { ThanhtoanComponent } from './appl/component/thanhtoan/thanhtoan.component';
import { TintucComponent } from './appl/component/tintuc/tintuc.component';
import { TrangChuDuAnComponent } from './appl/component/trang-chu-du-an/trang-chu-du-an.component';
import { ChiTietTuyenDungComponent } from './appl/component/chi-tiet-tuyen-dung/chi-tiet-tuyen-dung.component';
import { ChinhSachDaiLyCtvComponent } from './appl/component/chinh-sach-dai-ly-ctv/chinh-sach-dai-ly-ctv.component';
import { DuAnKhacComponent } from './appl/component/du-an-khac/du-an-khac.component';
import { HeThongDoiTacNewComponent } from './appl/component/he-thong-doi-tac-new/he-thong-doi-tac-new.component';
import { TuyenDungNewComponent } from './appl/component/tuyen-dung-new/tuyen-dung-new.component';

const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'so-luoc-ve-ngong', component: IntroduceComponent, title: 'S?? l?????c v??? Ng???ng' },
    { path: 'bao-chi-noi-gi-ve-ngong', component: NewsComponent, title: 'B??o ch?? n??i g?? v??? ng???ng' },
    { path: 'he-thong-san-xuat-va-quan-ly', component: ProdudctionSystemComponent, title: 'H??? th???ng s???n xu???t v?? qu???n l??' },
    { path: 'mua-o-dau', component: MuaodauComponent, title: 'Mua ??? ????u' },
    { path: 'lien-he', component: LienheComponent, title: 'Li??n h???' },
    { path: 'chuyen-cua-ngong', component: TintucComponent, title: 'Chuy???n c???a Ng???ng' },
    { path: 'chuyen-ngong', component: MuctintucComponent, title: 'Chuy???n Ng???ng' },
    { path: 'chuyen-xuong', component: MuctintucComponent, title: 'Chuy???n X?????ng' },
    { path: 'chuyen-vuon', component: MuctintucComponent, title: 'Chuy???n V?????n' },
    { path: 'chuyen-tieu-dung', component: MuctintucComponent, title: 'Chuy???n Ti??u D??ng' },
    { path: 'blogs', component: ChitiettintucComponent, title: 'Chi ti???t tin t???c' },
    // { path: 'chi-tiet-tin-tuc', component: ChitiettintucComponent, title: 'Chi ti???t tin t???c' },
    { path: 'danh-muc-san-pham', component: DanhmucsanphamComponent, title: 'Danh m???c s???n ph???m' },
    { path: 'chi-tiet-san-pham', component: ChitietsanphamComponent, title: 'Chi ti???t s???n ph???m' },
    { path: 'gio-hang', component: GiohangComponent, title: 'Gi??? h??ng' },
    { path: 'thanh-toan', component: ThanhtoanComponent, title: 'Thanh to??n ????n h??ng' },
    { path: 'tai-khoan', component: AccountComponent, title: 'T??i kho???n' },
    { path: 'chuyen-di-cua-ngong', component: ChuyenDiCuaNgongComponent, title: 'Chuy???n ??i c???a Ng???ng' },
    { path: 'dat-hang', component: DathangComponent, title: '?????t h??ng' },
    { path: 'trang-chu-du-an', component: TrangChuDuAnComponent, title: 'Trang ch??? d??? ??n' },
    { path: 'chi-tiet-tuyen-dung', component: ChiTietTuyenDungComponent, title: 'Chi ti???t tuy???n d???ng', pathMatch: 'full' },
    { path: 'chinh-sach-dai-ly-ctv', component: ChinhSachDaiLyCtvComponent, title: 'Ch??nh s??ch ?????i l??' },
    { path: 'du-an', component: DuAnKhacComponent, title: 'D??? ??n kh??c' },
    { path: 'he-thong-doi-tac', component: HeThongDoiTacNewComponent, title: 'H??? th???ng ?????i t??c' },
    { path: 'tuyen-dung-new', component: TuyenDungNewComponent, title: 'Tuy???n d???ng new' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

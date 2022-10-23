import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
import { ImgProductComponent } from '../common/img-product/img-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroduceComponent } from './component/introduce/introduce.component';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './component/news/news.component';
import { ProdudctionSystemComponent } from './component/produdctionSystem/produdctionSystem.component';
import { CarouselComponent } from '../common/carousel/carousel.component';
import { MuaodauComponent } from './component/muaodau/muaodau.component';
import { LienheComponent } from './component/lienhe/lienhe.component';
import { TintucComponent } from './component/tintuc/tintuc.component';
import { MuctintucComponent } from './component/muctintuc/muctintuc.component';
import { ChitiettintucComponent } from './component/chitiettintuc/chitiettintuc.component';
import { HeaderComponent } from '../common/header/header.component';
import { HeaderMenuComponent } from '../common/headerMenu/headerMenu.component';
import { DanhmucsanphamComponent } from './component/danhmucsanpham/danhmucsanpham.component';
import { ProductDialogComponent } from '../common/productDialog/productDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChitietsanphamComponent } from './component/chitietsanpham/chitietsanpham.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { GiohangComponent } from './component/giohang/giohang.component';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ThanhtoanComponent } from './component/thanhtoan/thanhtoan.component';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LoginComponent } from './component/login/login.component';
import { AccountComponent } from './component/account/account.component';
import { ChuyenDiCuaNgongComponent } from './component/chuyen-di-cua-ngong/chuyen-di-cua-ngong.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabViewModule } from 'primeng/tabview';
import { DathangComponent } from './component/dathang/dathang.component';
import { CommentDialogComponent } from '../common/commentDialog/commentDialog.component';
import { TrangChuDuAnComponent } from './component/trang-chu-du-an/trang-chu-du-an.component';
import { ChiTietTuyenDungComponent } from './component/chi-tiet-tuyen-dung/chi-tiet-tuyen-dung.component';
import { ChinhSachDaiLyCtvComponent } from './component/chinh-sach-dai-ly-ctv/chinh-sach-dai-ly-ctv.component';
import { DuAnKhacComponent } from './component/du-an-khac/du-an-khac.component';
import { HeThongDoiTacNewComponent } from './component/he-thong-doi-tac-new/he-thong-doi-tac-new.component';
import { TuyenDungNewComponent } from './component/tuyen-dung-new/tuyen-dung-new.component';
import { ComponentBaseComponent } from '../common/componentBase/componentBase.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        NgbModule,
        FormsModule,
        CarouselModule,
        BrowserAnimationsModule,
        RouterModule,
        MatDialogModule,
        GalleriaModule,
        ProgressBarModule,
        SidebarModule,
        CheckboxModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        HttpClientModule,
        OverlayPanelModule,
        AccordionModule,
        PanelMenuModule,
        TabViewModule,
        MessagesModule,
        MessageModule,
        ToastModule
    ],
    declarations: [
        MenuComponent,
        FooterComponent,
        ImgProductComponent,
        IntroduceComponent,
        NewsComponent,
        ProdudctionSystemComponent,
        CarouselComponent,
        MuaodauComponent,
        LienheComponent,
        TintucComponent,
        MuctintucComponent,
        ChitiettintucComponent,
        HeaderComponent,
        HeaderMenuComponent,
        DanhmucsanphamComponent,
        ProductDialogComponent,
        ChitietsanphamComponent,
        GiohangComponent,
        ThanhtoanComponent,
        LoginComponent,
        AccountComponent,
        ChuyenDiCuaNgongComponent,
        DathangComponent,
        CommentDialogComponent,
        TrangChuDuAnComponent,
        ChiTietTuyenDungComponent,
        ChinhSachDaiLyCtvComponent,
        DuAnKhacComponent,
        HeThongDoiTacNewComponent,
        TuyenDungNewComponent,
        ComponentBaseComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        MenuComponent,
        FooterComponent,
        ImgProductComponent,
        IntroduceComponent,
        NewsComponent,
        ProdudctionSystemComponent,
        CarouselComponent,
        MuaodauComponent,
        LienheComponent,
        TintucComponent,
        MuctintucComponent,
        ChitiettintucComponent,
        HeaderComponent,
        HeaderMenuComponent,
        DanhmucsanphamComponent,
        ChitietsanphamComponent,
        GiohangComponent,
        ThanhtoanComponent,
        LoginComponent,
        AccountComponent,
        ChuyenDiCuaNgongComponent,
        DathangComponent,
        CommentDialogComponent,
        TrangChuDuAnComponent,
        ChiTietTuyenDungComponent,
        ChinhSachDaiLyCtvComponent,
        DuAnKhacComponent,
        HeThongDoiTacNewComponent,
        TuyenDungNewComponent,
        ComponentBaseComponent
    ]
})
export class ApplModule { }

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { HttpService } from '../service/http-service';
import { Router } from '@angular/router';
import { Utils } from '../util/utils';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComponentBaseComponent } from '../componentBase/componentBase.component';
import { MessageService } from 'primeng/api';
import { LoginComponent } from 'src/app/appl/component/login/login.component';
@Component({
    selector: 'app-headerMenu',
    templateUrl: './headerMenu.component.html',
    styleUrls: ['./headerMenu.component.css']
})
export class HeaderMenuComponent extends ComponentBaseComponent implements OnInit {

    @Input() slide = false;
    visibleSidebar2: boolean = false;
    @Input() totalCartProduct = 0;
    @Input() account: any = null;
    @Output() cartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() cartHover: EventEmitter<any> = new EventEmitter<any>();
    @Output() accountClick: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('op', { static: false }) op!: OverlayPanel;
    ref!: DynamicDialogRef;
    searchBox: boolean = false;
    products: any[] = [];
    constructor(private httpService: HttpService, private dialogService: DialogService, private router: Router, private render2: Renderer2,
        private messageService1: MessageService) {
        super(messageService1, render2);
    }
    projectsList: any[] = [];
    ngOnInit() {
        this.httpService.reqeustApiget('projects', '1').subscribe((data: any) => {
            if (data.projectList) {
                data.projectList.forEach((item: any) => {
                    let path = '';
                    path = `du-an?name=${Utils.removeAccents(String(item.name)).toLowerCase().split(' ').join('-')}`;
                    item.url = `${window.location.origin}/${path}`;
                });
                this.projectsList = data.projectList;
            }
        });

        this.httpService.reqeustApiget('product_categories').subscribe((data: any) => {
            if (data.productCategories) {
                data.productCategories.forEach((item: any) => {
                    let path = '';
                    path = `danh-muc-san-pham?name=${Utils.removeAccents(String(item.name)).toLowerCase().split(' ').join('-')}&id=${item.id}`;
                    item.url = `${window.location.origin}/${path}`;
                });
                this.products = data.productCategories;
            }
        })
    }

    onCartClick(event: any) {
        this.cartClick.emit();
    }

    onMouseOver(event: any) {
        this.cartHover.emit(event);
    }

    onAccountClick(event: any) {
        this.accountClick.emit(event);
    }

    onLogOut() {
        this.op.hide();
        setTimeout(() => {
            sessionStorage.removeItem("account");
            sessionStorage.removeItem('productList');
            location.reload();
        }, 100);
    }

    openDialogLogin(login = false): void {
        this.op.hide();
        this.ref = this.dialogService.open(LoginComponent, {
            width: '100%',
            contentStyle: { "height": "auto", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                login: login,
                func: this.showMessage.bind(this)
            }
        });
    }

    onClick() {
        window.open(`${window.location.origin}/gio-hang`, "_self");
    }
}

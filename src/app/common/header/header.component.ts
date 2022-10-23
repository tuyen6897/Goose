import { Component, OnInit, Output, Input, Renderer2, ViewChild, ElementRef, AfterViewInit, EventEmitter, AfterContentInit, AfterContentChecked, HostListener, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LoginComponent } from 'src/app/appl/component/login/login.component';
import { ComponentBaseComponent } from '../componentBase/componentBase.component';
import { Utils } from '../util/utils';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [DialogService, MessageService]
})
export class HeaderComponent extends ComponentBaseComponent implements OnInit, AfterViewInit, AfterViewChecked {

    @ViewChild('op', { static: false }) op!: OverlayPanel;
    isSlide: boolean = false;
    product: any;
    total = '0';
    ref!: DynamicDialogRef;
    account: any = null;
    isaccount = false;
    private _visibleSidebar = false;
    @Input() set visibleSidebar(value: any) {
        this._visibleSidebar = value;
        if (value) {
            this.product = JSON.parse(sessionStorage.getItem("productList") as any);
            if (this.product && this.product.length) {
                let totalNumber = 0;
                this.product.forEach((item: any) => {
                    totalNumber += +(item.price) * item.quantity;
                    item.totalPrice = String(+(item.price) * item.quantity);
                });
                this.total = String(totalNumber);
            }
        }
    };

    get visibleSidebar() {
        return this._visibleSidebar;
    }
    @Input() banner: boolean = false;
    @ViewChild('menu', { static: false }) menu!: ElementRef;
    constructor(
        private render: Renderer2,
        private router: Router,
        private dialogService: DialogService,
        private messageService1: MessageService
    ) {
        super(messageService1);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.render.listen(document, 'scroll', (e) => {
            if (window.innerWidth <= 991) {
                return;
            }
            const scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            if (scrollTop >= 140) {
                this.render.addClass(this.menu.nativeElement, 'scrolling');
                this.isSlide = true;
            } else {
                this.render.removeClass(this.menu.nativeElement, 'scrolling');
                this.isSlide = false;
            }
        });
    }

    ngAfterViewChecked(): void {
        this.account = JSON.parse(sessionStorage.getItem("account") as any);
    }

    onLogOut() {
        this.op.hide();
        setTimeout(() => {
            sessionStorage.removeItem("account");
            location.reload();
        }, 100);
    }

    onClickCart(event: any) {
        this.visibleSidebar = false;
        Utils.sha256((Math.random() + 1).toString(36).substring(7)).then(eCode => {
            sessionStorage.setItem(eCode, JSON.stringify(this.product));
            window.open(`${window.location.origin}/thanh-toan?code=${eCode}`, "_self");
        });
    }

    onChange(event: any, index: number) {
        if (this.product && this.product.length) {
            let totalNumber = 0;
            this.product.forEach((item: any, i: any) => {
                if (i === index) {
                    item.quantity = event.value;
                    item.totalPrice = String(+(item.price) * item.quantity);
                    totalNumber += +(item.price) * item.quantity;
                }
            });
            this.total = String(totalNumber);
            sessionStorage.clear();
            sessionStorage.setItem('productList', JSON.stringify(this.product));
        }
    }

    onRemove(index: number) {
        if (this.product && this.product.length) {
            this.product = this.product.slice(1, index);
            let totalNumber = 0;
            this.product.forEach((item: any, i: any) => {
                totalNumber += +(item.price) * item.quantity;
            });
            this.total = String(totalNumber);
            sessionStorage.clear();
            sessionStorage.setItem('productList', JSON.stringify(this.product));
        }
    }

    openDialogLogin(login = false): void {
        this.op.hide();
        this.ref = this.dialogService.open(LoginComponent, {
            width: '30%',
            contentStyle: { "height": "auto", "overflow": "auto" },
            baseZIndex: 10000,
            dismissableMask: true,
            data: {
                login: login,
                func: this.showMessage.bind(this)
            }
        });
    }

    @HostListener('window: resize', ['$event'])
    resizeable(event: any) {
        this.op.hide();
    }

    @HostListener('window: scroll', ['$event'])
    onScroll(event: any) {
        this.op.hide();
    }

    formatCash(str: string) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
}

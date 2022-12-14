import { Component, OnInit, Output, Input, Renderer2, ViewChild, ElementRef, AfterViewInit, EventEmitter, ChangeDetectorRef, AfterContentInit, AfterContentChecked, HostListener, AfterViewChecked } from '@angular/core';
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

    @ViewChild('cart', { static: false }) cart!: OverlayPanel;
    isSlide: boolean = false;
    product: any;
    total = '0';
    totalProduct = 0;
    totalCartProduct = 0;
    ref!: DynamicDialogRef;
    account: any = null;
    isaccount = false;
    width = '';
    private _visibleSidebar = false;
    @Input() set visibleSidebar(value: any) {
        this._visibleSidebar = value;
        if (value) {
            this.product = JSON.parse(sessionStorage.getItem("productList") as any);
            if (this.product && this.product.length) {
                let totalNumber = 0;
                this.totalProduct = 0;
                this.product.forEach((item: any) => {
                    totalNumber += +(item.price) * item.quantity;
                    item.totalPrice = String(+(item.price) * item.quantity);
                    this.totalProduct += item.quantity;
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
        private render2: Renderer2,
        private router: Router,
        private dialogService: DialogService,
        private messageService1: MessageService,
        private cdr: ChangeDetectorRef
    ) {
        super(messageService1, render2);
    }

    ngOnInit() {
        this.loginScreen();
    }

    ngAfterViewInit() {
        this.render2.listen(document, 'scroll', (e) => {
            if (window.innerWidth <= 991) {
                return;
            }
            const scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            if (scrollTop >= 140) {
                this.render2.addClass(this.menu.nativeElement, 'scrolling');
                this.isSlide = true;
            } else {
                this.render2.removeClass(this.menu.nativeElement, 'scrolling');
                this.isSlide = false;
            }
        });
    }

    ngAfterViewChecked(): void {
        this.account = JSON.parse(sessionStorage.getItem("account") as any);
        const product = JSON.parse(sessionStorage.getItem("productList") as any);
        if (product && product.length) {
            this.totalCartProduct = 0;
            product.forEach((item: any) => {
                this.totalCartProduct += item.quantity;
            });
        } else {
            this.totalCartProduct = 0;
        }
        this.cdr.detectChanges();
    }

    accountonClick() {
        this.op.toggle(event);
    }

    onMouseOver(event: any) {
        this.product = JSON.parse(sessionStorage.getItem("productList") as any);
        this.totalProduct = 0;
        if (this.product && this.product.length) {
            let totalNumber = 0;
            this.product.forEach((item: any) => {
                totalNumber += +(item.price) * item.quantity;
                item.totalPrice = String(+(item.price) * item.quantity);
                this.totalProduct += item.quantity;
            });
            this.total = String(totalNumber);
        }
        this.cart.show(event);
    }

    onLogOut() {
        this.op.hide();
        setTimeout(() => {
            sessionStorage.removeItem("account");
            sessionStorage.removeItem('productList');
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
                    // item.totalPrice = String(+(item.price) * item.quantity);
                    item.totalPrice = item.price;
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
            width: this.width,
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
    resizeableHeader(event: any) {
        this.op.hide();
        this.cart.hide();
        this.loginScreen();
    }

    @HostListener('window: scroll', ['$event'])
    onScrollHeader(event: any) {
        this.op.hide();
        this.cart.hide();
    }

    formatCash(str: string) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    onClick() {
        window.open(`${window.location.origin}/gio-hang`, "_self");
    }

    onClickBuyNew(event: any) {
        this.cart.hide();
        if (window.location.href !== `${window.location.origin}/gio-hang`) {
            window.open(`${window.location.origin}/gio-hang`, "_self");
        }
    }

    createURL(name: string, id: string) {
        if (!name || !id) return '';
        return `chi-tiet-san-pham?name=${Utils.removeAccents(String(name)).toLowerCase().split(' ').join('-')}&id=${id}`;
    }

    loginScreen() {
        if (window.innerWidth > 1000) {
            this.width = '30%';
        }
        if (window.innerWidth <= 1000) {
            this.width = '40%';
        }
        if (window.innerWidth <= 800) {
            this.width = '50%';
        }
        if (window.innerWidth <= 700) {
            this.width = '60%';
        }
        if (window.innerWidth <= 550) {
            this.width = '70%';
        }
        if (window.innerWidth <= 420) {
            this.width = '100%';
        }

        if (window.document.querySelector('.p-dynamic-dialog')) {
            this.render2.setStyle(window.document.querySelector('.p-dynamic-dialog'), 'width', this.width);
        }
    }

}

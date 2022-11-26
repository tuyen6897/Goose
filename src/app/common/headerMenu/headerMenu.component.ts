import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../service/http-service';
import { Router } from '@angular/router';
import { Utils } from '../util/utils';
@Component({
    selector: 'app-headerMenu',
    templateUrl: './headerMenu.component.html',
    styleUrls: ['./headerMenu.component.css']
})
export class HeaderMenuComponent implements OnInit {

    @Input() slide = false;
    visibleSidebar2: boolean = false;
    @Input() totalCartProduct = 0;
    @Output() cartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() cartHover: EventEmitter<any> = new EventEmitter<any>();
    @Output() accountClick: EventEmitter<any> = new EventEmitter<any>();
    searchBox: boolean = false;
    products: any[] = [];
    constructor(private httpService: HttpService, private router: Router,) { }
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

    onClick() {
        window.open(`${window.location.origin}/gio-hang`, "_self");
    }
}

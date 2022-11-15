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
    @Output() cartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() accountClick: EventEmitter<any> = new EventEmitter<any>();
    searchBox: boolean = false;
    constructor(private httpService: HttpService, private router: Router,) { }
    projectsList: any[] = [];
    ngOnInit() {
        this.httpService.reqeustApiget('projects').subscribe((data: any) => {
            if (data.projectList) {
                data.projectList.forEach((item: any) => {
                    let path = '';
                    path = `du-an?name=${Utils.removeAccents(String(item.name)).toLowerCase().split(' ').join('-')}`;
                    item.url = `${window.location.origin}/${path}`;
                });
                this.projectsList = data.projectList.filter((x: any) => String(x.name).toUpperCase() !== 'CHUYẾN ĐI CỦA NGỖNG').slice(0, 3);
            }
        })
    }

    onCartClick(event: any) {
        this.cartClick.emit();
    }

    onAccountClick(event: any) {
        this.accountClick.emit(event);
    }

    onClick() {
        this.router.navigate(['gio-hang']);
    }
}

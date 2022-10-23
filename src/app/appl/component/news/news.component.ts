import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


    listTinTuc = [
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
        'Mật trà Kombucha thảo mộc 500ml',
    ]

    constructor() { }

    ngOnInit() {
    }

}

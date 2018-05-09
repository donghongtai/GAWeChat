import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser } from '../../../services/model';
import { Router } from '@angular/router';

@Component({
    selector: 'wechat-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonalComponent extends AppComponentBase implements OnInit {

    user: WechatUser;
    phone: string = '';

    constructor(injector: Injector, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (this.user && this.user.phone) {
                this.phone = this.user.phone.substr(0,3) + '****' + this.user.phone.substr(7);
            }
        });
    }

    goShowCard() {
        this.router.navigate(["/members/member-card"]);
    }

    goBindPhone(){
        this.router.navigate(["/personals/bind-member"]);
    }
} 

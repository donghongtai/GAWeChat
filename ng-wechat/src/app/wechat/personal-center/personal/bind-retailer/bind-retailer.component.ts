import { Component, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppComponentBase } from '../../../components/app-component-base';
import { WechatUserService } from '../../../../services';
import { Router } from '@angular/router';

import { ToptipsComponent, ToptipsService } from "ngx-weui/toptips";
import { ToastComponent } from "ngx-weui/toast";

@Component({
    selector: 'wechat-bind-retailer',
    templateUrl: './bind-retailer.component.html',
    styleUrls: [ './bind-retailer.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class BindRetailerComponent extends AppComponentBase {

    res: any = {};
    @ViewChild('toptips') toptips: ToptipsComponent;
    @ViewChild('loading') loadingToast: ToastComponent;

    constructor(injector: Injector, 
        private wechatUserService: WechatUserService, 
        private router: Router, 
        private srv: ToptipsService) { 
        super(injector);
    }

    onSave() {
        this.res.openId = this.settingsService.openId;
        if(this.settingsService.tenantId){
            this.res.tenantId = this.settingsService.tenantId;
        }
        this.res.userType = 1;//零售客户
        
        this.loadingToast._showd = true;
        this.wechatUserService.BindWeChatUserAsync(this.res).subscribe(result => {
            this.loadingToast.onHide();
            if(result.code == 0){//成功
                this.srv['success']('绑定成功');
                this.settingsService.setUser(result.data);
                this.router.navigate(["/shops/shop"]);
            } else {//失败
                this.srv['warn'](result.msg);
            }
        });
    }
}

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { HttpClient } from '../httpclient'
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { ApiResult, PurchaseRecord, ShopEvaluation } from '../model/index';


@Injectable()
export class PurchaserecordService {
    constructor(private http: HttpClient) { }
    GetPurchaseRecordById(params: any): Observable<PurchaseRecord[]> {
        return this.http.get('/api/services/app/PurchaseRecord/GetWXPagedPurchaseRecordAsync', params).map(data => {
            if (data.result) {
                return PurchaseRecord.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }

    GetWXNotEvaluationByIdAsync(params: any): Observable<PurchaseRecord[]> {
        return this.http.get('/api/services/app/ShopEvaluation/GetWXNotEvaluationByIdAsync', params).map(data => {
            if (data.result) {
                return PurchaseRecord.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }

    GetWXCountNotEvaluationByIdAsync(params: any): Observable<any> {
        return this.http.get('/api/services/app/ShopEvaluation/GetWXCountNotEvaluationByIdAsync', params).map(data => {
            if (data.result) {
                return data.result;
            } else {
                return null;
            }
        });
    }

    GetWXProductsDetailsByIdAsync(params: any): Observable<PurchaseRecord> {
        return this.http.get('/api/services/app/ShopEvaluation/GetWXProductsDetailsByIdAsync', params).map(data => {
            if (data.result) {
                return PurchaseRecord.fromJS(data.result);
            } else {
                return null;
            }
        });
    }
    GetWXEvaluationByIdAsync(params: any) {
        return this.http.get('/api/services/app/ShopEvaluation/GetWXEvaluationByIdAsync', params).map(data => {
            if (data.result) {
                return ShopEvaluation.fromJS(data.result);
            } else {
                return null;
            }
        });
    }
}

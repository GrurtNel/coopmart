import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HostConfig } from '../runtime/project.config';
@Injectable()
export class HttpApi<T> {
    // private host: string = environment.baseURL;
    constructor(
        private http: Http,
        private hostConfig: HostConfig
    ) {
    }

    public Get(endPoint: string, query?: any) {
        const apiURL = `${this.hostConfig.Http + endPoint}`;
        const param = new URLSearchParams();
        if (query) {
            Object.keys(query).forEach((k) => {
                param.set(k, query[k]);
            });
        }
        return this.http.get(apiURL, { params: param }).pipe(
            map((res: Response) => this.transformResponse(res)),
            catchError((error: any) => {
                this.handleError(error);
                return Observable.throw(error);
            })
        );
    }

    public Post(endPoint: string, body?: any) {
        const apiURL = `${this.hostConfig.Http + endPoint}`;
        return this.http.post(apiURL, body).pipe(
            map((res: Response) => this.transformResponse(res)),
            catchError((error: any) => {
                this.handleError(error);
                return Observable.throw(error);
            })
        );
    }

    public transformResponse(result: Response) {
        return <T>result.json().data || <T>{};
    }
    public handleError(err) {

    }
}

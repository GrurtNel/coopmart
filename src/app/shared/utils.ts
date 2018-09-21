import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

export function ObjectToString(params: Object) {
    let result = '';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const element = params[key];
            result += ('&' + key + '=' + element);
        }
    }
    return result;
}
export function compareObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function checkEmptyObject(param) {
    return Object.keys(param).length === 0 && param.constructor === Object;
}

@Injectable()
export class LocationService {

    constructor(
        private http: Http
    ) { }

    getLocation() {
        const apiKey = 'AIzaSyCGJGe8mLulE5lpHxDjUePpJIiDttQDukA'
        const endPoint = 'https://maps.googleapis.com/maps/api/geocode/json';
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => {
                    console.log(pos);
                    var param = new URLSearchParams();
                    param.set('key', apiKey)
                    param.set('latlng', pos.coords.latitude + ',' + pos.coords.longitude)
                    param.set('sensor', 'true');
                    this.http.get(`${endPoint}`, { params: param }).subscribe(res => {
                        console.log(res.json());
                        if (res.json().results[0]) {
                            const temp = res.json().results[0].formatted_address
                            resolve(temp ? temp : '')
                        }
                    }, err => reject(err))
                }, err => reject(err));
            } else {
                console.log('not support');
                reject();
            }
        })
    }
}

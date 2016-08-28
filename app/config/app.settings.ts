import { Injectable } from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppSettings {
    public index: string;
    public application_id: string;
    public api_key: string;

    constructor() {
        let storage = new Storage(SqlStorage);
        storage.get('settings')
            .then(settings => {
                let _settings = JSON.parse(settings);
                this.index = _settings.index;
                this.application_id = _settings.application_id;
                this.api_key = _settings.api_key;
            })
            .catch((error:any) => {
                console.log(error);
                //return Observable.throw(error.json().error || ‘Server error’);
            });
    }

    load() {
        let storage = new Storage(SqlStorage);
        return new Promise((resolve, reject) => {
            storage.get('settings')
                .then(settings => {
                    let _settings = JSON.parse(settings);
                    this.index = _settings.index;
                    this.application_id = _settings.application_id;
                    this.api_key = _settings.api_key;
                    resolve(true);
                })
                .catch((error:any) => {
                    console.log(error);
                    //return Observable.throw(error.json().error || ‘Server error’);
                });
        });
    }

    getIndex(){
        return this.index;
    }

    getApiKey(){
        return this.api_key;
    }

    getApplicationId(){
        return this.application_id;
    }
}
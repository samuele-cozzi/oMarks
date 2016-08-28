import { Injectable } from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';

import {AlgoliaSetting} from '../models/algolia_setting';

@Injectable()
export class AppSettings {
    private index: string;
    private application_id: string;
    private api_key: string;

    constructor() { }

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
                    resolve(true);
                    //return Observable.throw(error.json().error || ‘Server error’);
                });
        });
    }

    SaveAlgoliaSettings(algolia_setting: AlgoliaSetting){
        let storage = new Storage(SqlStorage);
        storage.set('settings', JSON.stringify(algolia_setting));
        this.index = algolia_setting.index;
        this.application_id = algolia_setting.application_id;
        this.api_key = algolia_setting.api_key;
    }

    DeleteAlgoliaSettings(){
        let storage = new Storage(SqlStorage);
        storage.query('delete from kv');
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
import { Injectable }   from '@angular/core';
import { Http, Headers }         from '@angular/http';
import {Platform, ionicBootstrap, Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import {AppSettings} from '../config/app.settings';

@Injectable()
export class OmarksAlgoliaService {

    public index: string;
    public application_id: string;
    public api_key: string;

    private service_url: string;
    private headers: Headers;

    constructor(private http: Http, private settings: AppSettings) { 

        this.index = settings.getIndex();
        this.application_id = settings.getApplicationId();
        this.api_key = settings.getApiKey();

        this.service_url = 'https://' + this.application_id + '.algolia.net/1/indexes/' + this.index;

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            'X-Algolia-API-Key': this.api_key,
            'X-Algolia-Application-Id': this.application_id
        });
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public get_dashboard() : Promise<any> {
        
        let body = {
            "params": "query=1",
            "restrictSearchableAttributes":"favorite",
            "hitsPerPage": "50"
        }

        return this.http.post(this.service_url + "/query", body, {headers: this.headers})
            .toPromise()
            .then(response => response.json().hits)
            .catch(this.handleError);
    }

    public get_facets() : Promise<any> {
        
        return this.http.get(this.service_url + '?facets=*', {headers: this.headers})
               .toPromise()
               .then(response => {
                   var obj = response.json().facets;
                   var response_array = [];
                   console.log(obj);
                   for (var key in obj) {
                       if(key.endsWith('.tag'))
                       {
                        for (var key1 in obj[key]) {
                            console.log(' name=' + key + ' value=' + key1);
                            response_array.push({
                                'key': key,
                                'value': key1
                            });
                            
                        }
                       }
                    }
                    console.log(response_array);
                   return response_array;
               })
               .catch(this.handleError);
    }

    public get_filtered_facets(key: string, value: string) : Promise<any> {
        
        return this.http.get(this.service_url + '?facetFilters='+ key + ':' + value, {headers: this.headers})
               .toPromise()
               .then(response => response.json().hits)
               .catch(this.handleError);
    }

    public get_query(query: string, hitsPerPage: number = 20, page: number = 0 ) : Promise<any> {
        
        let body = {
            "query": query,
            "hitsPerPage":hitsPerPage,
            "page": page
        }

        return this.http.post(this.service_url + '/query', body, {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

    public save_item(item) : Promise<any> {
        
        return this.http.post(this.service_url, item, {headers: this.headers})
            .toPromise()
            .then(response => response.json().hits)
            .catch(this.handleError);
    }

    public delete_item(item) : Promise<any> {
        
        return this.http.delete(this.service_url + '/' + item.objectID, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

}
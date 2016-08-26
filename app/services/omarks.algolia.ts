import { Injectable }   from '@angular/core';
import { Http, Headers }         from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OmarksAlgoliaService {

    private service_url: string = "https://M90FC3UY18.algolia.net/1/indexes/oMarks";
    //private service_url: string = "/algolia/pMarks";

    private service_key: string = "10c0596a79389d1e359ea13707208c4a";
    
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public get_dashboard() : Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            'X-Algolia-API-Key': this.service_key,
            'X-Algolia-Application-Id': 'M90FC3UY18'
        });

        return this.http.get(this.service_url, {headers: headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

    public get_query(query: string) : Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            'X-Algolia-API-Key': this.service_key,
            'X-Algolia-Application-Id': 'M90FC3UY18'
        });

        return this.http.get(this.service_url + '?query='+ query, {headers: headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

}
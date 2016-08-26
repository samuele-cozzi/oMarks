import { Injectable }   from '@angular/core';
import { Http, Headers }         from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OmarksAlgoliaService {

    private service_url: string = "https://M90FC3UY18.algolia.net/1/indexes/oMarks";
    //private service_url: string = "/algolia/pMarks";

    private service_key: string = "10c0596a79389d1e359ea13707208c4a";
    
    private headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            'X-Algolia-API-Key': this.service_key,
            'X-Algolia-Application-Id': 'M90FC3UY18'
        });

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public get_dashboard() : Promise<any> {
        
        return this.http.get(this.service_url, {headers: this.headers})
               .toPromise()
               .then(response => response.json())
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

    public get_query(query: string) : Promise<any> {
        
        return this.http.get(this.service_url + '?query='+ query, {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

}
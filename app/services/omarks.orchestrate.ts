import { Injectable }   from '@angular/core';
import { Http, Headers }         from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OmarksOrchestrateService {

    //private service_url: string = "https://api.orchestrate.io/v0/pMarks";
    private service_url: string = "/orchestrate/pMarks";

    private service_key: string = "Basic OTI2MGQzNzMtYjEyMC00YzY2LThlNTQtNTZjMmNlNjNhYjk2Og==";
    
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public get_dashboard() : Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/JSON',
            'Authorization': this.service_key
        });

        return this.http.get(this.service_url, {headers: headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

}
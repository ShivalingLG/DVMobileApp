import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the Vachanas provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VachanasAPI {

    private vachanasEndpoint = 'http://192.168.1.132:1234/API/Vachanas';
    private logsEndpoint = 'http://192.168.1.132:1234/API/Logs';

    //private vachanasEndpoint = 'http://localhost:1234/API/Vachanas';
    //private logsEndpoint = 'http://localhost:1234/API/Logs';

    private vachanasAuthKey = 'MyAuth123';

    constructor(public http: Http) {
        console.log('Hello Vachanas Provider');
    }

    getVachanas(date: Date): Promise<any> {

        return this.http.get(this.vachanasEndpoint + "/" + date)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    LogMessage(log: any): Promise<any> {

        return this.http.post(this.logsEndpoint, log)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
    private extractData(res: Response) {
        //Convert the response to JSON format
        let body = res.json();
        //Return the data (or nothing)
        return body || {};
    }

    //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(res: Response | any) {
        console.error('Entering handleError');
        console.dir(res);
        return Promise.reject(res.message || res);
    }
}

export class VachanaVM {

    Id: number;
    Vachana: string;
    Author: string;
    Contributor: string;
    Summary: string;
    //Audio: any;

    constructor(id: number, vachana: string, author: string, contributor: string, summary: string, audio: any = null) {

        this.Id = id;
        this.Vachana = vachana;
        this.Author = author;
        this.Contributor = contributor;
        this.Summary = summary;
    }
}

export class TodaysVachana {

    vachana: VachanaVM

    constructor() {

        this.vachana = new VachanaVM(0, "", "", "", "");
    }

    setTodaysVachana(vachanaObject) {

        this.vachana = vachanaObject; 
    }

    getTodaysVachana() {

        return this.vachana;
    }
}
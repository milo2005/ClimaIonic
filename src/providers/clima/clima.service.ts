import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/observable";
import {Clima} from "./clima";


@Injectable()
export class ClimaService {

    constructor(private http:Http){}

    loadClima():Observable<Clima>{
        let url:string ="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22popayan%2C%20co%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        return this.http.get(url).map(this.processResponse).catch(this.handleError);
    }

    private processResponse(res:Response):Clima{
        let body:any = res.json();
        let channel:any = body.query.results.channel;
        let atmosphere:any = channel.atmosphere;
        let condition:any = channel.item.condition;


        let clima =  new Clima();
        clima.hum = atmosphere.humidity;
        clima.pres = atmosphere.pressure;
        clima.des = condition.text;
        clima.temp = condition.temp;


        return clima;
    }

    private handleError(){
        return Observable.throw("Error al cargar el clima");
    }

}
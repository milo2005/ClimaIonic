import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ClimaService} from "../../providers/clima/clima.service";
import {Clima} from "../../providers/clima/clima";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[ClimaService]
})
export class HomePage {

  clima:Clima;

  constructor(public navCtrl: NavController, private service:ClimaService) {
      this.clima = new Clima();
    service.loadClima().subscribe(
        (res)=> this.clima = res
      , (err)=> console.log(err)
      );
  }

}

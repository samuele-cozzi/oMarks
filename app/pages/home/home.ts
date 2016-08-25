import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OmarksOrchestrateService} from '../../services/omarks.orchestrate';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [OmarksOrchestrateService]
})
export class HomePage implements OnInit {

  marks : any;
  constructor(private navCtrl: NavController, private orchestrateServices: OmarksOrchestrateService) {
  
  }

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(): void {
    this.orchestrateServices.get_dashboard().then(items => {
      console.log(items);
      this.marks = items.results;
    });
  }
}

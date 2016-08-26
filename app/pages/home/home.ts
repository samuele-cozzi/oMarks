import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OmarksOrchestrateService} from '../../services/omarks.orchestrate';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [OmarksOrchestrateService, OmarksAlgoliaService]
})
export class HomePage implements OnInit {

  marks : any;
  constructor(private navCtrl: NavController, private searchServices: OmarksAlgoliaService) {
  
  }

  ngOnInit(): void {
    this.getDashboard();
  }

  open(url,event){
    window.open(url);
  }

  getDashboard(): void {
    this.searchServices.get_dashboard().then(items => {
      console.log(items);
      var newArr = [];
      while(items.hits.length) newArr.push(items.hits.splice(0,5));
      this.marks = newArr;
      console.log(this.marks);
    });
  }
}

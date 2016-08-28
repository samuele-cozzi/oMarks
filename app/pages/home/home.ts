import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [OmarksAlgoliaService]
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

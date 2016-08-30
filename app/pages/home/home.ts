import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CodeItemPage} from '../code_item/code_item'
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [OmarksAlgoliaService]
})
export class HomePage implements OnInit {

  marks = [];
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
      this.marks = items;
    });
  }

  editCode(item){
    this.navCtrl.push(CodeItemPage, {
      item: JSON.stringify(item, null, 2)
    });
  }
}

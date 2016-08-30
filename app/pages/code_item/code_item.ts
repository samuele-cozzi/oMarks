import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/code_item/code_item.html',
  providers: [OmarksAlgoliaService]
})
export class CodeItemPage implements OnInit{
  item_string: string;
  item: any; 
  message: string = "";

  constructor(private navCtrl: NavController, private navParams: NavParams, private searchServices: OmarksAlgoliaService) {}

  ngOnInit(): void {
    this.item_string = this.navParams.get('item');
    this.item = JSON.parse(this.item_string);
  }

  save(){
    let request = JSON.parse(this.item_string);
    this.searchServices.save_item(request)
        .then(x => this.navCtrl.push(HomePage))
        .catch(err => this.message = " Error: " + err);
  }
}

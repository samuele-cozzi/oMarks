import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/edit_item/edit_item.html',
  providers: [OmarksAlgoliaService]
})
export class EditItemPage implements OnInit{
  item: any; 
  message: string = "";

  constructor(private navCtrl: NavController, private navParams: NavParams, private searchServices: OmarksAlgoliaService) {}

  ngOnInit(): void {
    this.item = JSON.parse(this.navParams.get('item'));
  }

  save(){
    this.searchServices.save_item(this.item)
        .then(x => this.navCtrl.push(HomePage))
        .catch(err => this.message = " Error: " + err);
  }
}

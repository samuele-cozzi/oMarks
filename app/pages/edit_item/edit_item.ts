import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {HomePage} from '../home/home';
import {CodeItemPage} from '../code_item/code_item';

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
    if (this.item.image == null)
    {
      this.item.has_image = 1;
      this.item.image = {
        src: this.item.image_src
      }
    }
    this.item.time_read = Number.parseFloat(this.item.time_read);
    this.searchServices.save_item(this.item)
        .then(x => this.navCtrl.push(HomePage))
        .catch(err => this.message = " Error: " + err);
  }

  star(){
    this.item.favorite = 1;
    this.searchServices.save_item(this.item)
        .then(x => this.navCtrl.push(HomePage))
        .catch(err => this.message = " Error: " + err);
  }

  code(){
    this.navCtrl.push(CodeItemPage, {
      item: JSON.stringify(this.item, null, 2)
    });
  }

  delete(){
    this.searchServices.delete_item(this.item)
        .then(x => this.navCtrl.push(HomePage))
        .catch(err => this.message = " Error: " + err);
  }
}

import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {CodeItemPage} from '../code_item/code_item';
import {EditItemPage} from '../edit_item/edit_item';

@Component({
  templateUrl: 'build/pages/search_detail/search_detail.html',
  providers: [OmarksAlgoliaService]
})
export class SearchDetailPage implements OnInit{
  items: string[];
  key: string;
  value: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private searchServices: OmarksAlgoliaService) {
    this.items = [];
    this.key = navParams.get('key');
    this.value = navParams.get('value');
  }

  ngOnInit(): void {
    this.searchItems(this.key, this.value);
  }

  searchItems(key, value) {
    this.searchServices.get_filtered_facets(key, value).then(items => {
      console.log(items);
      this.items = items;
    });
  }

  open(item,event){
    if (typeof item.time_read == "string")
    {
      item.time_read = 0;
    }
    item.time_read ++;
    
    this.searchServices.save_item(item);
    window.open(item.given_url)
  }

  editCode(item){
    this.navCtrl.push(CodeItemPage, {
      item: JSON.stringify(item, null, 2)
    });
  }

  edit(item){
    this.navCtrl.push(EditItemPage, {
      item: JSON.stringify(item, null, 2)
    });
  }
}

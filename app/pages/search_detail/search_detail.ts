import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';

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

  open(url,event){
    window.open(url);
  }
}

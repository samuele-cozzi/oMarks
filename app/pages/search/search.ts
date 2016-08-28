import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SearchDetailPage} from '../search_detail/search_detail';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [OmarksAlgoliaService]
})
export class SearchPage  implements OnInit {
  searchQuery: string = '';
  items: string[];
  facets: any[];

  constructor(private navCtrl: NavController, private searchServices: OmarksAlgoliaService) {
    this.items = [];
  }

  ngOnInit(): void {
    this.searchFacets();
  }

  searchItems(event) {
    this.searchQuery = event.target.value;

    // if the value is an empty string don't filter the items
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.searchServices.get_query(this.searchQuery).then(items => {
        console.log(items);
        this.items = items.hits;
      });
    } else {
      this.items = [];
    }

    console.log(this.items.length);
  }

  searchFacets() {
    this.searchServices.get_facets().then(items => {
      this.facets = items;
    });
  }

  goto(key,value){
    this.navCtrl.push(SearchDetailPage, {
      key: key,
      value: value
    });
  }

  open(url,event){
    window.open(url);
  }
}

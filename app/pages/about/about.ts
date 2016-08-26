import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OmarksOrchestrateService} from '../../services/omarks.orchestrate';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [OmarksOrchestrateService, OmarksAlgoliaService]
})
export class AboutPage {
  searchQuery: string = '';
  items: string[];

  constructor(private navCtrl: NavController, private searchServices: OmarksAlgoliaService) {
    this.items = [];
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
}

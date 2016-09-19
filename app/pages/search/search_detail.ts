import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {KeysPipe} from '../../pipes/keys';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {SearchBase} from './search_base';
import {CodeItemPage} from '../code_item/code_item';
import {EditItemPage} from '../edit_item/edit_item';

@Component({
  templateUrl: 'build/pages/search/search_detail.html',
  providers: [OmarksAlgoliaService],
  pipes: [KeysPipe]
})
export class SearchDetailPage extends SearchBase implements OnInit{

  constructor(navCtrl: NavController
    , navParams: NavParams
    , toastCtrl: ToastController
    , searchServices: OmarksAlgoliaService) {

    super(navCtrl, navParams, toastCtrl, searchServices);
    this.items = [];
    this.key = navParams.get('key');
    this.value = navParams.get('value');
  }

  ngOnInit(): void {
    this.searchItems();
  }

}

import {Component, OnInit, ElementRef, Renderer} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {SearchDetailPage} from './search_detail';
import {SearchBase} from './search_base';
import {CodeItemPage} from '../code_item/code_item';
import {EditItemPage} from '../edit_item/edit_item';
import {KeysPipe} from '../../pipes/keys';
import {SplitPipe} from '../../pipes/split'
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [OmarksAlgoliaService],
  host: {'(document:keyup)': '_keyup($event)'},
  pipes: [KeysPipe, SplitPipe]
})

export class SearchPage extends SearchBase implements OnInit {
  

  constructor(navCtrl: NavController, navParams: NavParams, toastCtrl: ToastController, searchServices: OmarksAlgoliaService) {
    super(navCtrl, navParams, toastCtrl, searchServices);
    this.items = [];
    this.searchQuery = "";
  }

  ngOnInit(): void {
    this.searchItems();
  }

  onInput(){
    console.log('ionInput');
    this.searchInputed =true;
    this.searchItems();
  }  

  goto(key,value){
    this.navCtrl.push(SearchDetailPage, {
      key: key,
      value: value
    });
  }

  onBlur()
  {
    console.log('ionBlur');
  }

  onFocus()
  {
    console.log('ionFocus');
  }

  onCancel()
  {
    console.log('ionCancel');
  }

  onClear()
  {
    console.log('ionClear');
  }


  private _keyup(event){
    if (!this.searchInputed)
    {
      if(event.key.length == 1){
        this.searchQuery += event.key;
        this.searchItems();
      }
      else if(event.key == "Backspace"){
        this.searchQuery = this.searchQuery.slice(0, -1);
        this.searchItems();
      }
      else if(event.key == "Enter"){
        super.open(this.items[0], null);
      }
    }
  }
}

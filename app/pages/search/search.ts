import {Component, OnInit, ElementRef, Renderer} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {SearchDetailPage} from '../search_detail/search_detail';
import {CodeItemPage} from '../code_item/code_item';
import {EditItemPage} from '../edit_item/edit_item';
import {KeysPipe} from '../../pipes/keys';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [OmarksAlgoliaService],
  host: {'(document:keyup)': '_keyup($event)'},
  pipes: [KeysPipe]
})
export class SearchPage  implements OnInit {
  searchQuery: string = '';
  searchInputed: boolean = false;
  items: string[];
  facets: any[];
  page: number = 0;

  constructor(private navCtrl: NavController
    , private navParams: NavParams
    , private searchServices: OmarksAlgoliaService) {
    this.items = [];
    this.searchQuery = "";
  }

  ngOnInit(): void {
    this.searchFacets();
    this.searchItems();
  }

  searchItemsImputed(){
    this.searchInputed =true;
    this.searchItems();
  }

  searchItems() {
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.searchServices.get_query(this.searchQuery, 20, this.page).then(items => {
        console.log(items);
        this.items = items.hits;
      });
    } else {
      this.items = [];
    }
  }

  searchFacets() {
    this.searchServices.get_facets().then(items => {
      this.facets = items;
    });
  }

  doInfinite(infiniteScroll) {
    if (this.items.length > 0)
    {
      this.page ++;
      console.log('Begin async operation: ' + this.page);
      this.searchServices.get_query(this.searchQuery, 20, this.page).then(items => {
        if (items.hits.length == 0)
        {
          infiniteScroll.enable(false);
        }
        for (var i = 0; i < items.hits.length; i++) {
          this.items.push( items.hits[i] );
        }
        console.log('Async operation has ended');
        infiniteScroll.complete();
      });
    }
    else
    {
      infiniteScroll.complete();
    }
  }

  goto(key,value){
    this.navCtrl.push(SearchDetailPage, {
      key: key,
      value: value
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

  add_star(item){
    item.favorite = 1;
    this.searchServices.save_item(item)
        .then(x => this.searchItems())
        .catch(err => this.searchItems());
  }

  remove_star(item){
    item.favorite = 0;
    this.searchServices.save_item(item)
        .then(x => this.searchItems())
        .catch(err => this.searchItems());
  }

  delete(item){
    this.searchServices.delete_item(item)
        .then(x => this.searchItems())
        .catch(err => this.searchItems());
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
        this.open(this.items[0], null);
      }
    }
  }
}

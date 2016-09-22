import {Component, OnInit} from '@angular/core';
import {NavController, Tabs, ToastController} from 'ionic-angular';

import {EditItemPage} from '../edit_item/edit_item'
import {SearchPage} from '../search/search'
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [OmarksAlgoliaService],
  host: {'(document:keydown)': '_keydown($event)'}
})
export class HomePage implements OnInit {

  marks = [];
  constructor(private navCtrl: NavController
    , private toastCtrl: ToastController
    , private searchServices: OmarksAlgoliaService) {
  
  }

  ngOnInit(): void {
    this.getDashboard();
  }

  open(item,event){
    if (typeof item.time_read == "string")
    {
      item.time_read = 0;
    }
    //item.time_read ++;
    
    this.searchServices.save_item(item);
    window.open(item.given_url)
  }

  getDashboard(): void {
    this.searchServices.get_dashboard().then(items => {
      console.log(items);
      this.marks = items;
    });
  }

  edit(item){
    this.navCtrl.push(EditItemPage, {
      item: JSON.stringify(item, null, 2)
    });
  }

  remove_star(item){
    item.favorite = 0;
    this.searchServices.save_item(item)
        .then(x => {
          let toast = this.toastCtrl.create({
            message: 'Saved!',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        })
        .catch(err => {
          let toast = this.toastCtrl.create({
            message: 'Error: ' + err,
            duration: 2000,
            position: 'top'
          });
          toast.present();
        });
  }

  private _keydown(event){
    if (event.key == 'Tab')
    {
      this.navCtrl.parent.select(1);
    }
  }
}

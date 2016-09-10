import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/code_item/code_item.html',
  providers: [OmarksAlgoliaService]
})
export class CodeItemPage implements OnInit{
  item_string: string;
  item: any; 

  constructor(private navCtrl: NavController
    , private navParams: NavParams
    , private toastCtrl: ToastController
    , private searchServices: OmarksAlgoliaService) {}

  ngOnInit(): void {
    this.item_string = this.navParams.get('item');
    this.item = JSON.parse(this.item_string);
  }

  save(){
    let request = JSON.parse(this.item_string);
    this.searchServices.save_item(request)
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
}

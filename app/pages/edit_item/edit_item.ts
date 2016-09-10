import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

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

  constructor(private navCtrl: NavController
    , private navParams: NavParams
    , private toastCtrl: ToastController
    , private searchServices: OmarksAlgoliaService) {}

  ngOnInit(): void {
    this.item = JSON.parse(this.navParams.get('item'));
  }

  save(){
    if (this.item.image == null && this.item.image_src != '')
    {
      this.item.has_image = 1;
      this.item.image = {
        src: this.item.image_src
      }
    }
    this.item.time_read = Number.parseFloat(this.item.time_read);
    this.searchServices.save_item(this.item)
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

  star(){
    this.item.favorite = 1;
    this.searchServices.save_item(this.item)
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

  code(){
    this.navCtrl.push(CodeItemPage, {
      item: JSON.stringify(this.item, null, 2)
    });
  }

  delete(){
    this.searchServices.delete_item(this.item)
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

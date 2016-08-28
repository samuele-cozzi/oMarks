import {Component} from '@angular/core';
import {NavController, Storage, SqlStorage} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {AlgoliaSetting} from '../../models/algolia_setting';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [ OmarksAlgoliaService]
})
export class LoginPage {

  settings:AlgoliaSetting = new AlgoliaSetting();
  errors:string='';

  constructor(private navCtrl: NavController, private searchServices: OmarksAlgoliaService) {
  }

  login(event){
    let storage = new Storage(SqlStorage);
    storage.set('settings', JSON.stringify(this.settings));
    this.navCtrl.push(TabsPage);
  }
}

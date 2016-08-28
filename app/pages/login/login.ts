import {Component} from '@angular/core';
import {NavController, Storage, SqlStorage} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {AlgoliaSetting} from '../../models/algolia_setting';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {AppSettings} from '../../config/app.settings';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [ OmarksAlgoliaService]
})
export class LoginPage {

  settings:AlgoliaSetting = new AlgoliaSetting();
  errors:string='';

  constructor(private navCtrl: NavController, private searchServices: OmarksAlgoliaService, private app_settings: AppSettings) {
  }

  login(event){
    this.app_settings.SaveAlgoliaSettings(this.settings);
    this.navCtrl.push(TabsPage);
  }
}

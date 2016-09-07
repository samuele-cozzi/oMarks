import {Component, OnInit} from '@angular/core';
import {NavController, Storage, SqlStorage} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {AlgoliaSetting} from '../../models/algolia_setting';
import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {AppSettings} from '../../config/app.settings';

@Component({
  templateUrl: 'build/pages/setting/setting.html',
  providers: [ OmarksAlgoliaService]
})
export class SettingPage  implements OnInit{

  settings:AlgoliaSetting = new AlgoliaSetting();
  errors:string='';

  constructor(private navCtrl: NavController, private searchServices: OmarksAlgoliaService, private app_settings: AppSettings) {
  }

  ngOnInit(): void {
    this.settings.api_key = this.app_settings.getApiKey();
    this.settings.application_id = this.app_settings.getApplicationId();
    this.settings.index = this.app_settings.getIndex();
  }

  save(event){
    this.app_settings.SaveAlgoliaSettings(this.settings);
    this.navCtrl.push(TabsPage);
  }

  delete(event){
    this.app_settings.DeleteAlgoliaSettings();
    window.location.reload();
  }

  refresh(event){
    window.location.reload();
  }
  
}

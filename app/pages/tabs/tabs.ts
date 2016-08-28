import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {SearchPage} from '../search/search';
import {SettingPage} from '../setting/setting';
import {LoginPage} from '../login/login';
import {AppSettings} from '../../config/app.settings';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor(private navCtrl: NavController, private settings: AppSettings) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    if (this.settings.getApplicationId() == undefined)
    {
      this.navCtrl.push(LoginPage);
    }

    this.tab1Root = HomePage;
    this.tab2Root = SearchPage;
    this.tab3Root = SettingPage;
  }
}

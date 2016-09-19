import {NavController, NavParams, ToastController} from 'ionic-angular';

import {OmarksAlgoliaService} from '../../services/omarks.algolia';
import {CodeItemPage} from '../code_item/code_item';
import {EditItemPage} from '../edit_item/edit_item';

export class SearchBase {

    protected searchQuery: string = '';
    protected searchInputed: boolean = false;
    protected items: string[];
    protected facets: any[];
    protected page: number = 0;
    protected key: string = "";
    protected value: string = "";
    
    
    constructor(protected navCtrl: NavController
    , protected navParams: NavParams
    , protected toastCtrl: ToastController
    , protected searchServices: OmarksAlgoliaService) {  }

    searchItems() {
        if (this.searchQuery && this.searchQuery.trim() != '') {
            this.searchServices.get_query(this.searchQuery, 20, this.page).then(items => {
                this.items = items;
            });
        } 
        else if (this.key != "" && this.value != "")
        {
            this.searchServices.get_filtered_facets(this.key, this.value).then(items => {
                this.items = items;
            });
        } 
        else 
        {
            this.searchServices.get_facets().then(items => {
                this.facets = items;
            });
        }
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


    

}
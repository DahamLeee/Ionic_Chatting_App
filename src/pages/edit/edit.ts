import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  item = {} as { key:string, name:string, amount: number; };

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.item = this.navParams.get('myparam');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  onEdit() {
    this.db.list('shopping-list').update( this.item.key, this.item );
    this.navCtrl.pop();
  }

}

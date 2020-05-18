import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  item_name: string;
  amount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  onAdd() {
    this.db.list('shopping-list').push({name: this.item_name, amount: this.amount });
    this.navCtrl.pop();
  }

}


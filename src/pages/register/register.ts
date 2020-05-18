import { AngularFireDatabase } from '@angular/fire/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { Profile } from '../../model/profile.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  profile = {avatar: 'assets/imgs/avatar1.jpg'} as Profile;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af:AngularFireAuth, private tc:ToastController, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register() {
    try {
      const result = await this.af.auth.createUserWithEmailAndPassword(
				this.profile.email, this.password );

      this.tc.create( {
        message: "Registration success",
        duration: 3000
      }).present();
      console.log(result);
      console.log(result.user.uid);
      try {
        await this.db.object(`profiles/${result.user.uid}`).set(this.profile);
        console.log("Adding a profile succeeded.");
      }
      catch(e) {
        console.log(e);
      }
      this.navCtrl.pop();
    } 
    catch(e) {
      this.tc.create( {
        message: e.message,
        duration: 3000
      }).present();
      console.error(e);
    }
  }
}

import { HomePage } from './../home/home';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../../model/profile.interface';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: Profile;
  myuid: string;
  auth: AngularFireAuth;
  subscription: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private app: App, private afAuth: AngularFireAuth) {
    this.myuid = this.afAuth.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.subscription = this.db.object(`profiles/${this.myuid}`).valueChanges().subscribe( (result:Profile) => this.profile = result );
  }

  async logout() {
    this.subscription.unsubscribe();
    await this.afAuth.auth.signOut();
    alert("logout Success");
    this.app.getRootNav().setRoot(HomePage);
  }

}

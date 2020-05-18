import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
// import { Profile } from './../../model/profile.interface';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  profileList: Observable<any[]>;
  myuid: string;
  peerID: string;
  key: string;
  myName: string;

  constructor(public app : App, public navCtrl: NavController, private db: AngularFireDatabase, public navParams: NavParams) {
    console.log(navParams.data.uid);
    this.myuid = navParams.data.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
    //this.profileList = this.db.list('profiles').valueChanges();
    this.profileList = this.db.list('profiles').snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
    //this.myuid = this.afAuth.auth.currentUser.uid;
  }
  selectProfile(profile){
    console.log(profile);
    this.navCtrl.push('MessagePage', {'profile' : profile, peerName: profile.firstName + ' ' +profile.lastName, peerID: profile.key});
  }

}

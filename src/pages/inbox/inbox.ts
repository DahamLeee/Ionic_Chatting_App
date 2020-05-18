// import { LASTMSG_LIST } from './../../mockup/lastmessage.mockup';
// import { LastMessage } from './../../model/lastmessage.interface';
// import { Message } from '../../model/message.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  profileList: Observable<any[]>;
  lMsgList : Observable<any[]>;
  peerID : string;
  myuid : string;

  constructor(public app : App, public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.myuid = this.afAuth.auth.currentUser.uid;
    // this.profileList = this.db.list('profiles').snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
    this.lMsgList = this.db.list(`last-messages/${this.myuid}`)
    .valueChanges().pipe(map(changes => {
      changes.map(mkey =>{
        console.log(mkey);
        //@ts-ignore
        this.db.object(`/messages/${mkey.lastmsg}`).valueChanges().subscribe(
          (x)=>{
            //@ts-ignore
            mkey.lastmsg = x;
            //@ts-ignore
            console.log(mkey.lastmsg);
          }
        )
      });
      console.log(changes);
      return changes;
    }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }
  goMessage(lMsg){
    if(lMsg.fromID != this.myuid){
      console.log(lMsg.fromID);
      this.navCtrl.push('MessagePage', {peerName: lMsg.fromName, peerID: lMsg.fromID});
    }else{
      console.log(lMsg.fromID);
      this.navCtrl.push('MessagePage', {peerName: lMsg.toName, peerID: lMsg.toID});
    }
  }
}

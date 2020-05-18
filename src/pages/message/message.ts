import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from './../../model/profile.interface';
import { Message } from './../../model/message.interface';
import { MESSAGE_LIST } from './../../mockup/message.mockup';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  profile: Profile;
  myuid : string;
  peerID : string;
  peerName : string;
  msgList: Observable<any[]>;
  messageList: Message[] = MESSAGE_LIST;
  myName : string;
  subscription: any;
  msg : string;
  sub : any;
  unread : number;
  @ViewChild('content') ct : Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.myuid = this.afAuth.auth.currentUser.uid;
    this.peerName = this.navParams.get('peerName');
    this.peerID = navParams.get('peerID');
    this.profile = this.navParams.get('profile');
    this.db.object(`profiles/${this.myuid}`).valueChanges().subscribe((result : Profile) => this.myName = result.firstName + ' ' + result.lastName );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.msgList = this.db.list(`message-by-user/${this.myuid}/${this.peerID}`)
    .valueChanges().pipe(map(changes => {
      changes.map(mkey =>{
        //@ts-ignore
        this.db.object(`/messages/${mkey.msgkey}`).valueChanges().subscribe(
          (x)=>{
            //@ts-ignore
            mkey.msg = x.msg;
            //@ts-ignore
            mkey.fromID = x.fromID;
            //@ts-ignore
            mkey.toID = x.toID;
          }
        )
      });
      return changes;
    }));
    this.sub = this.db.list(`message-by-user/${this.peerID}/${this.myuid}`).snapshotChanges().pipe(map(changes=>changes.map(c=>{
      this.db.object(`message-by-user/${this.peerID}/${this.myuid}/${c.payload.key}`).update({unread:0});
      if(this.ct) this.ct.scrollTo(0, 10000, 0);
    })))
    this.sub = this.sub.subscribe();
  }
  async sendMessage(){
    let message = {fromID: this.myuid, toID: this.peerID, msg: this.msg, fromName: this.myName, toName: this.peerName};
    let key = await this.db.list(`messages`).push(message).key;

    await this.db.list(`message-by-user/${this.myuid}/${this.peerID}`).push({msgkey: key, unread: 1});
    await this.db.list(`message-by-user/${this.peerID}/${this.myuid}`).push({msgkey: key, unread: 0});

    await this.db.object(`last-messages/${this.myuid}/${this.peerID}`).set({lastmsg: key});
    await this.db.object(`last-messages/${this.peerID}/${this.myuid}`).set({lastmsg: key});
    this.msg = "";
    if(this.ct) this.ct.scrollToBottom(0);
  }
  ionViewDidLeave(){
    this.sub.unsubscribe();
  }
}

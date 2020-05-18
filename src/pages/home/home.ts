import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //items: Observable<any[]>;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth , public navParams: NavParams) {

  }
  async login() {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.email, this.password )
      .then( user => {
        alert("Login success");
        this.navCtrl.setRoot('TabsPage', {uid : user.user.uid});
        console.log(user);
        console.log(user.user.uid);
      })
      .catch(
        reason=> alert(reason)
      );
  }




  async register(){
    this.navCtrl.push('RegisterPage')
  }

}

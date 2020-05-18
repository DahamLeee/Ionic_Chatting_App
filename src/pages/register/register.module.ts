import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    AngularFireAuthModule,
    IonicPageModule.forChild(RegisterPage),
  ],
})
export class RegisterPageModule {}

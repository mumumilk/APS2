import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, IonicApp, MenuController, ModalController } from 'ionic-angular';

//providers 
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Usuario } from '../../models/usuario';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'Login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public usuario: Usuario;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider,
    public toastCtrl: ToastController,
    public app: IonicApp,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController
  ) {
    this.menuCtrl.swipeEnable(false);
    this.usuario = new Usuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  entrar() {
    if (this.usuario.email && this.usuario.senha) {
      this.firebase.auth().signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).catch((error) => this.mostraToast(error.message))
    }
    else {
      this.mostraToast('Preencha usuario e senha para entrar')
    }
  }

  registrar() {
    this.modalCtrl.create('ModalCadastro').present();
  }

  mostraMenu() {
    this.app.getElementRef
  }

  mostraToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: false
    }).present();
  }

}

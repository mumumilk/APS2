import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FirebaseProvider } from "../providers/firebase/firebase";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  img : any;
  rootPage: any = 'Login';

  emailUsuario: string = " ";

  pages: Array<{title: string, component: any}>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public firebase : FirebaseProvider, public menu : MenuController ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: 'Dashboard' },
      { title: 'Tarefas', component: 'Tarefas' }
    ];

    this.firebase.auth().onAuthStateChanged(user => {
      this.rootPage = (!user) ? 'Login' : 'Tarefas';
      this.emailUsuario = firebase.auth().currentUser ? firebase.auth().currentUser.email : " ";
      this.img = localStorage.getItem('imagem');
    })

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  sair(){
    this.firebase.auth().signOut().then(() => this.nav.setRoot('Login'));
    this.menu.close();
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Tarefa, Contato, Coords } from '../../models/tarefa';
declare var google: any;
/**
 * Generated class for the TarefasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'Tarefas'
})
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {
  public usuario;
  public tarefas: Tarefa[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public firebase: FirebaseProvider
  ) {
    this.usuario = firebase.auth().currentUser;
    this.tarefas = new Array<Tarefa>();
    this.recuperaTarefas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarefasPage');
  }

  abrirModal() {
    this.modalCtrl.create('ModalTarefa').present();
  }

  recuperaTarefas() {
    if (this.usuario) {
      let caminho = this.usuario.uid + '/tarefas';
      this.firebase.database().ref(caminho).on('child_added', (snapshot) => {
        if (!snapshot.val().removida) {
          this.tarefas.push(snapshot.val() as Tarefa);
        }
      })
    }
  }


  statusTarefa(id, indice, completada : boolean) {
    if (this.usuario) {
      let caminho = this.usuario.uid + '/tarefas/' + id;
      this.firebase.database().ref(caminho).update({
        completada : completada,
        removida: true
      });
      this.tarefas.splice(indice, 1);
    }
  }

}

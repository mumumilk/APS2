import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Tarefa, Contato, Coords } from '../../models/tarefa';
import { Contacts } from '@ionic-native/contacts';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseProvider } from '../../providers/firebase/firebase';

declare var google: any;
/**
 * Generated class for the ModalTarefaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'ModalTarefa'
})
@Component({
  selector: 'page-modal-tarefa',
  templateUrl: 'modal-tarefa.html',
})
export class ModalTarefaPage {
  public tarefa: Tarefa;
  public mapa;
  public usuario;
  public coordenadas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public contact: Contacts,
    public alertCtrl: AlertController,
    public geolocation: Geolocation,
    public firebase: FirebaseProvider
  ) {
    this.tarefa = new Tarefa();
    this.usuario = this.firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTarefaPage');
    this.localizar();
  }

  fecharModal() {
    this.viewCtrl.dismiss();
  }

  adicionarContato() {
    this.contact.pickContact().then((contato) => {
      this.tarefa.contato.nome = contato.displayName;
      this.tarefa.contato.fone = contato.phoneNumbers[0].value;
    });
  }

  removerContato() {
    this.tarefa.contato.nome = null;
    this.tarefa.contato.fone = null;
  }

  localizar() {
    this.geolocation.getCurrentPosition().then((position) => {
      if (!(this.tarefa.coordenadas.latitude && this.tarefa.coordenadas.longitude)) {
        this.tarefa.coordenadas.latitude = position.coords.latitude;
        this.tarefa.coordenadas.longitude = position.coords.longitude;
      }
      this.coordenadas = new google.maps.LatLng(this.tarefa.coordenadas.latitude, this.tarefa.coordenadas.longitude);
      this.abrirMapa();
    });
  }


  abrirMapa() {
    this.mapa = new google.maps.Map(document.getElementById('map'), {
      center: this.coordenadas,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: true,
    });


    this.definirMarcador();
  }

  definirMarcador() {
    let marker = new google.maps.Marker({
      map: this.mapa,
      animation: google.maps.Animation.DROP,
      position: this.mapa.getCenter(),
      draggable: true
    })
  }

  salvar() {
    if (this.usuario) {
      this.tarefa.id = this.gerarId();
      this.tarefa.completada = false;
      this.tarefa.removida = false;
      let caminho = this.usuario.uid + '/tarefas/' + this.tarefa.id;
      this.firebase.database().ref(caminho).set(this.tarefa);
    }
    this.fecharModal();
  }

  gerarId() : string{
    let possiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let texto = '';
    for( let i=0; i < 10; i++ ){
      texto += possiveis.charAt(Math.floor(Math.random() * possiveis.length)); 
    }
    return texto;
  }
}

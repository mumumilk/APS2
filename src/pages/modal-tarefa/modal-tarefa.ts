import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Tarefa } from '../../models/tarefa';
import { Contacts } from '@ionic-native/contacts';
import { Geolocation } from '@ionic-native/geolocation';
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
  public contato;
  public coordenadas;
  public mapa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public contact: Contacts,
    public alertCtrl: AlertController,
    public geolocation: Geolocation
  ) {
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
      this.contato = contato;
    });
  }

  removerContato() {
    this.contato = null;
  }

  localizar() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.coordenadas = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.abrirMapa();
    });
  }

  abrirMapa() {
    this.mapa = new google.maps.Map(document.getElementById('map'), {
      center: this.coordenadas,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    });


    this.definirMarcador(this.coordenadas);
  }

  definirMarcador(coords) {
    let marker = new google.maps.Marker({
      map: this.mapa,
      animation: google.maps.Animation.DROP,
      position: this.mapa.getCenter(),
      draggable: true
    })
  }
}

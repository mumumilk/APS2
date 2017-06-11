import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Usuario } from '../../models/usuario';
import { FirebaseProvider } from '../../providers/firebase/firebase';
/**
 * Generated class for the ModalCadastroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'ModalCadastro'
})
@Component({
  selector: 'page-modal-cadastro',
  templateUrl: 'modal-cadastro.html',
})
export class ModalCadastroPage {
  private usuario: Usuario;

  private configuracao: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  private pickerOption: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 100,
    height: 1500,
    outputType: 0,
    width: 1500
  }


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private app: App,
    public camera: Camera,
    public picker: ImagePicker,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public firebase: FirebaseProvider
  ) {
    this.usuario = new Usuario();
    this.usuario.imagem = this.stringFoto('http://i.imgur.com/hV6q7b8.png');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCadastroPage');
  }

  fecharModal() {
    this.viewCtrl.dismiss();
  }

  abrirAlert() {
    let alert = this.alertCtrl.create({
      title: 'Selecionar a imagem',
      message: 'Selecione a origem',
      buttons: [
        {
          text: 'Câmera',
          handler: data => {
            this.tirarFoto();
          }
        }, {
          text: 'Galeria',
          handler: data => {
            this.selecionarGaleria();
          }
        }]
    });

    alert.present();
  }

  tirarFoto() {
    this.camera.getPicture(this.configuracao).then(
      (ImageData) => this.usuario.imagem = this.stringFoto('data:image/jpeg;base64,' + ImageData),
      (err) => console.log(err)
    );
  }

  selecionarGaleria() {
    this.picker.getPictures(this.pickerOption).then(
      (ImageData) => this.usuario.imagem = this.stringFoto(ImageData),
      (err) => console.log(err)
    );
  }

  cadastrar() {
    if (this.usuario.email && this.usuario.senha) {
      this.firebase.auth()
        .createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
        .then(x => this.mostraToast('Usuario cadastrado com sucesso'))
        .catch((error) => { this.mostraToast(error.message) });
    }
    else{
      this.mostraToast('Usuario ou senha invalidos');
    }
  }

  mostraToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: false
    }).present();
  }

  stringFoto(url: string) : string{
    return 'url(' + url + ')'
  }
}

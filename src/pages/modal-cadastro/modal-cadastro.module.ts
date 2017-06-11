import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCadastroPage } from './modal-cadastro';

@NgModule({
  declarations: [
    ModalCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCadastroPage),
  ],
  exports: [
    ModalCadastroPage
  ]
})
export class ModalCadastroPageModule {}

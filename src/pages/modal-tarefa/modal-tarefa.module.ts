import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalTarefaPage } from './modal-tarefa';

@NgModule({
  declarations: [
    ModalTarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalTarefaPage),
  ],
  exports: [
    ModalTarefaPage
  ]
})
export class ModalTarefaPageModule {}

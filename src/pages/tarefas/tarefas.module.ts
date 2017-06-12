import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefasPage } from './tarefas';

@NgModule({
  declarations: [
    TarefasPage
  ],
  imports: [
    IonicPageModule.forChild(TarefasPage)
  ],
  exports: [
    TarefasPage
  ]
})
export class TarefasPageModule {}

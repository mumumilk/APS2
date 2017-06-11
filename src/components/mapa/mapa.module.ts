import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaComponent } from './mapa';

@NgModule({
  declarations: [
    MapaComponent,
  ],
  imports: [
    IonicPageModule.forChild(MapaComponent),
  ],
  exports: [
    MapaComponent
  ]
})
export class MapaComponentModule {}

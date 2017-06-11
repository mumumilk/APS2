import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'map',
  template: `<div id="map" style="width: 90%; height: 50%; margin: auto;"></div>`
})
export class MapaComponent {
  public coordenadas: any;
  public mapa;

  constructor(
    public geolocation: Geolocation
  ) {
    this.localizar();
  }

  localizar() {
    debugger
    this.geolocation.getCurrentPosition().then((position) => {
      this.coordenadas = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.abrirMapa();
    });
  }

  abrirMapa() {
    debugger
    this.mapa = new google.maps.Map(document.getElementById('map'), {
      center: this.coordenadas,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
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

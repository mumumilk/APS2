import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Tarefa } from "../../models/tarefa";



/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'Dashboard'
})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public doughnutChart: any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  public usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {
    this.usuario = this.firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    var dados = [0, 0];
    if (this.usuario) {
      let fin = 0;
      let des = 0;
      let caminho = this.usuario.uid + '/tarefas';
      this.firebase.database().ref(caminho).on("child_added", (snapshot) => {
        (snapshot.val() as Tarefa).completada ? fin++ : des++;
        dados = [fin, des];
        console.log(dados);
      })
    }

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: [ "Finalizadas", "Descartadas"],
        datasets: [{
          label: '# of Votes',
          data: dados,
          backgroundColor: [
            "#36A2EB",
            "#FF6384"
            

          ],
          hoverBackgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
            
          ]
        }]
      }

    });
  }



}

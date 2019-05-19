import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { pagamentos } from '../pagamentos';
import { ServeletService } from '../servelet.service';
import { delay } from 'q';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {

  datainicial;
  datafinal;
  ticketBanco;
  TotalPagar = 0;
  id;
  
  constructor(private router: Router, public alertController: AlertController, public serv: ServeletService, private activateRoute:ActivatedRoute) {  }

  ngOnInit() {}

  ionViewWillEnter(){
     this.id = this.activateRoute.snapshot
    .paramMap.get('id')
  }
  AtualizarLista(){

    this.serv.UpdateTicket(this.datainicial,this.datafinal,this.TotalPagar,this.id);
  
  }

  Voltar(){

    this.router.navigate(['/tabs/tab2']);

  }

  ValorPago(){

    var Calculo = this.CalculaHoras();
    if(Calculo != null){

      Calculo = Calculo  * 10;
      this.TotalPagar = Calculo;
      if(this.TotalPagar != 0){
        this.AtualizarLista();
        //this.AlertPagamento();
        this.router.navigate(['/tabs/tab3']);
        
      
      }else{

        this.AlertErro();      
      }

  }
  }

  CalculaHoras() {
    var d1 = this.datainicial.split(":");
    var d2 = this.datafinal.split(":");
    var hora1 = d1[0];
    var minuto1 = d1[1];
    var hora2 = d2[0];
    var minuto2 = d2[1];

    hora1 = (hora1 * 60) + parseInt(minuto1); //630
    hora2 = (hora2 * 60) + parseInt(minuto2);  // 680

    if(hora2 > hora1){

      var final = hora2 - hora1;

      final = final / 60;
      if(Number.isInteger(final)){

        return final;

      }else{

        var aux = Math.round(final);

        if(aux < final){

          return final = aux + 1;
      
        }else{

          return final = Math.round(final);
          
        }

      }
    }
  }

  
  async AlertPagamento() {
    const alert = await this.alertController.create({
      header: 'Atenção',
     // subHeader: 'Subtitle',
      message: 'Pagamento realizado com sucesso',
      buttons: ['OK']
    });

    await alert.present();
  }
    

  
  async AlertErro() {
    const alert = await this.alertController.create({
      header: 'Atenção',
     // subHeader: 'Subtitle',
      message: 'Erro ao efetuar pagamento',
      buttons: ['OK']
    });

    await alert.present();
  }
  


}

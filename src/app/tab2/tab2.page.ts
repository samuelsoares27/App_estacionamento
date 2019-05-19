import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ServeletService } from '../servelet.service';
import { AlertController } from '@ionic/angular';
import { pagamentos } from '../pagamentos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  ticket;
  ticketBanco : pagamentos;
  pag : Observable<pagamentos[]>;
  
  constructor(private router: Router, public alertController: AlertController, public serv: ServeletService){ }

  ValidarTicket(){

    if(this.ticket != ''){

      this.pag = this.serv.getPagamento();

      this.pag.forEach(item => { 
        item.forEach(pagamento => { 
   
          if((pagamento.ticket == this.ticket)){

            if (pagamento.valor == 0){
              
              this.AlertNTiket();
           
            }else{

              this.AlertPago();

            }

          }
        })
      });

    }else{

      this.AlertBranco(); 

    }    
  }

  ngOnInit() {

    this.ticket = '';
    
  }

  async AlertBranco() {
    const alert = await this.alertController.create({
      header: 'Alerta',
     // subHeader: 'Subtitle',
      message: 'Campo Ticket está em Branco',
      buttons: ['OK']
    });

    await alert.present();
  }

  async AlertNTiket() {
    const alert = await this.alertController.create({
      header: 'Alerta',
     // subHeader: 'Subtitle',
      message: 'Esse Ticket não foi pago',
      buttons: ['OK']
    });

    await alert.present();
  }

  async AlertPago() {
    const alert = await this.alertController.create({
      header: 'Alerta',
     // subHeader: 'Subtitle',
      message: 'Ticket já foi pago',
      buttons: ['OK']
    });

    await alert.present();
  }

}

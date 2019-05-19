import { Component } from '@angular/core';
import { ServeletService } from '../servelet.service';
import { pagamentos } from '../pagamentos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

   pag : Observable<pagamentos[]>;

  constructor(public serv: ServeletService){ }

  ngOnInit() {
    this.pag = this.serv.getPag();
  }
}

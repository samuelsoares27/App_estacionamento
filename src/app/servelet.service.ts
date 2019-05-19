import { Injectable } from '@angular/core';
import { PAGAMENTOS } from './mockPagamentos';
import { pagamentos } from './pagamentos';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServeletService {

  pagamentos = PAGAMENTOS;
  pagar : pagamentos;

  pag : Observable<pagamentos[]>;
  pagamentosCollection: AngularFirestoreCollection<pagamentos>;
  ticket : pagamentos;

  constructor( private afs: AngularFirestore ) {

    this.pagamentosCollection = this.afs.collection<pagamentos>('pagamentos');

    this.pag = this.pagamentosCollection.snapshotChanges()
    .pipe( 
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        } );
      } )
     );

   }

   getPag(): Observable<pagamentos[]>{
    return this.pag;
   }

   getPagamento(): Observable<pagamentos[]>{
     return this.pag = this.pagamentosCollection.snapshotChanges()
     .pipe( 
       map( actions => {
         return actions.map( a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, ...data};
         } );
       } )
      );
   }


   addPagamento(pagCarro: pagamentos): Promise<DocumentReference>{
     var data = JSON.parse(JSON.stringify(pagCarro));
    return this.pagamentosCollection.add(data);
  }

  ticketBanco(ticket : pagamentos){
    this.pagar = ticket;
  }
  
  UpdateTicket(datafinal, datainicial, valor, id){
    return this.pagamentosCollection.doc(id)
    .update({  
      datafinal:datafinal,
      datainicial:datainicial,
      valor:valor
    })
  }

  getDados(id: string){
    return this.pagamentosCollection.doc<pagamentos>(id).valueChanges();
  }

}

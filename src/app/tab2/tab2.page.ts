import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ''; //vazia
  public resultado: string; // null

  constructor() {}

  public adicionarNumero(valor: string){
    this.calculo = this.calculo + valor;
  }

  public adicionarPonto(){
    this.calculo += ".";  //mesma funsao, com jeito diferente 
  }

  public adicionarOperacao(operador: string) {
    this.calculo += operador;
  }

  public apagarTudo() {
    this.calculo ='';
    this.resultado = null;
  }
}

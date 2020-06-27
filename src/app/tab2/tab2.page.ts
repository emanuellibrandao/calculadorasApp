import { Component } from '@angular/core';
import {evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ''; //vazia
  public resultado: string; // null

  private ponto = false; //privada pois só vai aparecer aqui e não no html 

  private operacoes = ['+', '-', '*', '/'] // +=0, -=1, *=2, /=3

  constructor(public alertController: AlertController) {}

  public adicionarNumero(valor: string){
    if(this.resultado){   //se tiver algo no resultado
      this.apagarTudo(); //chamo o apagarTudo 
    }

    this.calculo = this.calculo + valor;
  }

  public adicionarPonto(){

    if(this.ponto){ //se a variavel . estiver sendo verdadeira 
      return; // retorna vazio, parando a execução do metodo 
    }

    this.calculo += ".";  //mesma funsao, com jeito diferente 
    this.ponto = true; // transformando o . em verdadeiro 
  }

  public adicionarOperacao(operador: string) {

    if(this.resultado){
      this.calculo = this.resultado.toString(); //carregando o resultado do calculo anterior com o novo
      this.resultado = null; // limpando resultado
    }

    const ultimo = this.calculo.slice(-1); // chamando o ultimo caracter
    
    if(this.operacoes.indexOf(ultimo) > -1) { //procura na operacao o ultimo catacter)
    return; 
    }
    
    this.calculo += operador;
    this.ponto = false; //ao comecar uma operacao, pode colocar um .
  }

  // zera tudo da calculadora 
  public apagarTudo() {
    this.calculo ='';
    this.resultado = null;
    this.ponto = false; // se eu limpar a tela, ela volta a ser falsa 
  }

  // apaga o ultimo ultimo 
  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1); 
    if(ultimo == '.') {// verificar se o ultimo é um ponto 
    this.ponto = false;
    }

    this.calculo = this.calculo.slice(0, -1); // passa um inicio(qual posição começa o corte), final (final do corte, porem sem o ultimo "numero")
                                              // se o inicio for maior que o final, ele retorna vazio("")
                                              // se for negativo, ele pega os caracteres a partir do final do texto   
                                              //substring(inicial, final)
                                              //ele inverte os numeros automaticamente 
                                              //se for negativo ou caracter que não seja numero, ele substitui por 0
                                              
                                              //os dois fazem:
                                              //retorna vazio, se o inicio e o final forem iguais ("")
                                              //sem um final, ele pega tudo 
                                              //ao colocar um numero maior, ele pega o ultimo
    
 
                                            
  }

  public calcularResultado(){
    try {                                     // se der errado o calculo ele vai para a outra aplicacao 
      this.resultado = evaluate(this.calculo);
    } catch (e) {
      this.resultado = ''; //zerando resultaado 
      this.presentAlert('ERRO!!!', 'Cálculo inválido, verifique!');
    }
    
  }

  //apresentando a mensagem de alerta 
  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}

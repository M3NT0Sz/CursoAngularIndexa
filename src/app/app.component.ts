import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './componentes/container/container.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

import agenda from './agenda.json';
import { FormularioContatoComponent } from './paginas/formulario-contato/formulario-contato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormularioContatoComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  filtroPorTexto: string = '';

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter(contato => {
      const nomeSemAcento = contato.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const filtroSemAcento = this.filtroPorTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return nomeSemAcento
        .toLowerCase()
        .includes(filtroSemAcento.toLowerCase());
    });
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter((contato) => {
      return contato.nome.toLowerCase().startsWith(letra);
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minhas-financas';

  menus : any [] = [
    {descricao: 'Dashboard', rota: 'dashboard'},
    {descricao: 'Categoria', rota: 'categoria'},
    {descricao: 'Entradas', rota: 'entrada'},    
    //{descricao: 'Entradas', rota: 'entradas'}
  ]


}

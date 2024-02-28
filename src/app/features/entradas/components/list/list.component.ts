import { Component, ViewChild } from '@angular/core';
import { Entrada } from '../../models/entrada.model';
import { EntradasService } from '../../service/entradas.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['nome','pago','data','valor','tipo','editar','excluir'];

  dataSource = new MatTableDataSource<Entrada>();
  entradas: Entrada[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private entradaService: EntradasService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.buscarEntradas();
  }

  buscarEntradas(){
    this.entradaService.getEntradas()
    .subscribe((entradas: Entrada[]) => {
      this.entradas = entradas;
      this.dataSource.data = this.entradas;
    })
  }

  ngAfterViewInit() {
    this.dataSource.data = this.entradas;
    this.dataSource.paginator = this.paginator;
  }

  chamarEdicao(entrada: Entrada) {
    this.router.navigate(['entrada', 'editar', entrada.id]);
  }

  excluirEntrada(id: number) {
    this.entradaService.excluirEntrada(id).subscribe((resposta) => {
      this.router.navigate(['entrada']);
      this.buscarEntradas();
    });
  }

  novaEntrada() {
    this.router.navigate(['entrada', 'novo']);
  }
}



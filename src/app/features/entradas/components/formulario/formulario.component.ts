import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../models/entrada.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntradasService } from '../../service/entradas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/features/categorias/models/categoria.model';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  tiposDeEntradas = ['Receita', 'Despesa'];

  statusDePagamento = [
    { value: true, descricao: 'Pago' },
    { value: false, descricao: 'Pendente' },
  ];

  categorias: Categoria[] = [];
  formEntradas!: FormGroup;
  rota: string = '';
  id: string = '';
  entrada !: Entrada;
  estaCriando: boolean = false;

  categorias$ = this.categoriaService.getCategorias();


  constructor(
    private readonly categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private readonly entradaService: EntradasService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.criarFormulario();

    this.rota = this.activatedRouter.snapshot.url[0].path;

    if(this.rota === 'editar'){
      this.id = this.activatedRouter.snapshot.url[1].path;
      this.buscarEntradaPeloId();
    }else{
      this.estaCriando = true
    }
    
  }

  buscarEntradaPeloId(){
    this.entradaService.getEntradasId(+this.id)
    .subscribe((entrada: Entrada) =>{
      this.entrada = entrada;

      const data = this.entrada.data.split('/');

      this.formEntradas.controls['nome'].setValue(this.entrada.nome);
      this.formEntradas.controls['valor'].setValue(this.entrada.valor);
      this.formEntradas.controls['categoriaId'].setValue(this.entrada.categoriaId);
      this.formEntradas.controls['pago'].setValue(this.entrada.pago);
      this.formEntradas.controls['tipo'].setValue(this.entrada.tipo);
      this.formEntradas.controls['data'].setValue(new Date(+data[2], +data[1] -1, +data[0]));
      

    })
  }


  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      categoriaId: ['', Validators.required],
      pago: [true, Validators.required],
      tipo: ['Despesa', Validators.required],
      data: [new Date(), Validators.required],
    });
  }

  salvarEntrada() {
    const data = dayjs(this.formEntradas.controls['data'].value).format(
      'DD/MM/YYYY'
    );

    const payLoadRequest: Entrada = Object.assign(
      '',
      this.formEntradas.getRawValue()
    );

    payLoadRequest.data = data;

    const payLoad: Entrada = {
      nome: payLoadRequest.nome,
      categoriaId: payLoadRequest.categoriaId,
      data: payLoadRequest.data,
      pago: payLoadRequest.pago,
      tipo: payLoadRequest.tipo,
      valor: payLoadRequest.valor,
    };

    //this.formEntradas.controls['data'].setValue(data);

    if(this.estaCriando){
      this.criarNovaEntrada(payLoad)
    }else{
      payLoad.id = this.entrada.id
      this.editarEntrada(payLoad)
    }
  }

  criarNovaEntrada(payLoad: Entrada){
    this.entradaService.criarEntrada(payLoad).subscribe((resposta) => {
      console.log('ok');
      this.redirecionar();
    });
  }

  editarEntrada(payLoad: Entrada){
    this.entradaService.editarEntrada(payLoad).subscribe((resposta) =>{
      console.log('editado');
      this.redirecionar();
    })
  }

  redirecionar(){
    this.router.navigate(['entrada'])
  }



}

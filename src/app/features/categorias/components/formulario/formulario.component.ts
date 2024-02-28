import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  categoria!: Categoria;
  id: string = '';
  formCategoria!: FormGroup;
  rota: string = '';
  eUmNovoFormulario: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formeBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();

    if (this.rota === 'editar') {
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarCategoriasPeloId();
    } else {
      this.eUmNovoFormulario = true;
    }
  }

  buscarCategoriasPeloId() {
    this.categoriaService
      .getCategoriasPeloId(parseInt(this.id))
      .subscribe((categoria: Categoria) => {
        this.categoria = categoria;
        this.formCategoria.controls['nome'].setValue(categoria.nome);
        this.formCategoria.controls['descricao'].setValue(categoria.descricao);
      });
  }

  criarFormulario() {
    this.formCategoria = this.formeBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  salvarCategoria() {
    if (this.formCategoria.touched && this.formCategoria.dirty) {
      const payLoad: Categoria = {
        nome: this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value,
      };

      if (this.eUmNovoFormulario) {
        this.criarCategoria(payLoad);
      } else {
        payLoad.id = this.categoria.id;
        this.editarCategoria(payLoad);
      }
    }
  }

  editarCategoria(payLoad: Categoria) {
    this.categoriaService.alterarCategoria(payLoad).subscribe((resposata) => {
      this.router.navigate(['categoria']);
    });
  }

  criarCategoria(payLoad: Categoria) {
    this.categoriaService.criarCategoria(payLoad).subscribe((resposata) => {
      this.router.navigate(['categoria']);
    });
  }
}

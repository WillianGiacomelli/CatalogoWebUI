import { CategoriesService } from './../../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../../../../model/categorie';
import { RequestHeader } from '../../../utils/RequestHeader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  providers: [CategoriesService, RequestHeader],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {
  public displayedCategories: string[] = ['Id', 'Nome', 'Imagem', 'Acao'];
  public dataSource?: Categorie[];
  isLoadingResults = true;

  constructor(private catService: CategoriesService) {}

  ngOnInit(): void {
    this.catService.getCategories().subscribe(
      (res) => {
        this.dataSource = res;
        console.log(this.dataSource);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}

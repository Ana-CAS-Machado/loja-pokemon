import { Component } from '@angular/core';
import { ItemsType } from 'src/app/types/Items.type';
import { HomeService } from './home.service';
import { ItemsFilterType } from 'src/app/types/Itemsfilter.type';
import { ItemsService } from 'src/app/services/items.services';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public listaItems: ItemsType[] = [];

  constructor(
    private _itemsService: ItemsService,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.verificarSeUsuarioEstaLogado();
  }

  public verificarSeUsuarioEstaLogado(): void {
    const usuarioLogado = this._authService.usuarioEstaAutenticado();
    if (usuarioLogado) {
      this.filtrarItemsPorNome();
    } else {
      this._router.navigate(['login']);
    }
  }

  public filtrarItemsPorNome(filtro?: ItemsFilterType) {
    this._itemsService.getItems(filtro).subscribe({
      next: (resp) => {
        let listaFavoritos: string[] = [];
        const favoritosString = localStorage.getItem('favoritos');
        if (favoritosString) {
          listaFavoritos = JSON.parse(favoritosString);
        }
        this.listaItems = resp.map((item) => {
          item.isFavorite = !!listaFavoritos.find((fav) => fav === item.id);
          return item;
        });
        console.log('next');
      },
      error: (err) => {
        console.log(err);
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  public getDetalhesItem(id: string) {
    this._router.navigate([`/details/${id}`]);
  }
}

window.onload = function() {
  alert('Atenção: Nem todos os itens possuem imagens no momento. Estamos trabalhando para atualizar isso o mais rápido possível.');
};


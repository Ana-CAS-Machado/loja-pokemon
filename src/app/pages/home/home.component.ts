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
  public listaEquipamentos: ItemsType[] = [];

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
      this.filtrarEquipamentosPorNome();
    } else {
      this._router.navigate(['login']);
    }
  }

  public filtrarEquipamentosPorNome(filtro?: ItemsFilterType) {
    this._itemsService.getListaEquipamento(filtro).subscribe({
      next: (resp) => {
        let listaFavoritos: string[] = [];
        const favoritosString = localStorage.getItem('favoritos');
        if (favoritosString) {
          listaFavoritos = JSON.parse(favoritosString);
        }
        this.listaEquipamentos = resp.map((item) => {
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

  public getDetalhesEquipamento(id: string) {
    this._router.navigate([`/details/${id}`]);
  }
}

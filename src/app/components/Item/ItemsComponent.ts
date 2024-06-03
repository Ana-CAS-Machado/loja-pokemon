import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ItemsType } from "src/app/types/Items.type";


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemsComponent {
  @Input() items!: ItemsType;
  @Output() verDetalhes = new EventEmitter<string>();

  public clickHandler() {
    this.verDetalhes.emit(this.items.id);
  }

  public favoriteHandler() {
    const favoritos = localStorage.getItem('favoritos');
    if (!favoritos) {
      this.items.isFavorite = true;
      const novoFavorito = [this.items.id];
      localStorage.setItem('favoritos', JSON.stringify(novoFavorito));
    } else {
      const listaFavoritos: string[] = JSON.parse(favoritos);
      const EhFavorito = !!listaFavoritos.find(
        (item) => item === this.items.id
      );
      if (EhFavorito) {
        this.items.isFavorite = false;
        const novaListaFavoritos = listaFavoritos.filter(
          (item) => item !== this.items.id
        );
        localStorage.setItem('favoritos', JSON.stringify(novaListaFavoritos));
      } else {
        this.items.isFavorite = true;
        listaFavoritos.push(this.items.id);
        localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
      }
    }
  }
}

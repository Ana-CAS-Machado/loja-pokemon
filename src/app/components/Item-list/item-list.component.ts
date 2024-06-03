import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemsType } from 'src/app/types/Items.type';

@Component({
  selector: 'app-Item-list',
  templateUrl: './Item-list.component.html',
  styleUrls: ['./Item-list.component.scss'],
})
export class ItemsListComponent {
  @Input() listaitens: ItemsType[] = [];
  @Output() verDetalhesItem = new EventEmitter<string>();

  public verDetalhes(id: string) {
    this.verDetalhesItem.emit(id);
  }
}

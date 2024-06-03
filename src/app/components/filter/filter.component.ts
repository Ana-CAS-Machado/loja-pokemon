import { Component, EventEmitter, Output } from '@angular/core';
import { availableOptionsConstants } from 'src/app/constants/available-options.constants';
import { sortOptionsConstants } from 'src/app/constants/sort-options.constants';
import { ItemsFilterType } from '../../types/Itemsfilter.type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public filtro: string = '';
  public sortOrder: string = '';
  public isAvailable: string = '';

  public availableOptions = availableOptionsConstants;
  public sortOptions = sortOptionsConstants;

  @Output() filtroEmitter: EventEmitter<ItemsFilterType> =
    new EventEmitter<ItemsFilterType>();

  public buscaritens() {
    const filtroitens: ItemsFilterType = {
      search: this.filtro,
      sort: this.sortOrder,
      orderBy: 'name',
    };

    if (this.isAvailable.trim().length > 0) {
      filtroitens.isAvailable = this.isAvailable === 'true';
    }

    this.filtroEmitter.emit(filtroitens);
  }
  public limparFiltro() {
    this.filtro = '';
    //this.filtroEmitter.emit(this.filtro);
  }

}

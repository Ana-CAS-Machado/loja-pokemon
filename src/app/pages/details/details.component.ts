import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../services/items.services';
import { ItemsType } from 'src/app/types/Items.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public mento:  ItemsType | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ItemsService:  ItemsService
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._ItemsService.getItem(id).subscribe({
        next: (res) => (this.mento = res),
        error: (_) => this._router.navigate(['']),
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: 'filter-list.component.html',
})
export class FilterListComponent {
  public filterListForm = new FormGroup({
    hero: new FormControl(''),
  });
  public dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}

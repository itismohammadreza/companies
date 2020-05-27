import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() config;
  @Output() rowClicked = new EventEmitter();
  cols: string[] = [];

  ngOnInit() {
    for (let key in this.config.header) this.cols.push(key);
  }

  onRowClick(item) {
    this.rowClicked.emit(item);
  }
}

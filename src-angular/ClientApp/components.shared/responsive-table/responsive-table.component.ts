
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FilterTextComponent } from '../filter-text/filter-text.component';
export interface IColumnConfig {
    name: string;
    header: string;
    type: string;
    order: boolean;
    filter: boolean;
}
export interface ITableData {
    crud: boolean;
    refresh: boolean;
    dataList: any[];
    columnConfigList: IColumnConfig[];
}

@Component({
    selector: 'responsive-table',
    template: require('./responsive-table.component.html'), 
    //template:`responsive-table`,
    //styles: [require('./responsive-table.component.css')],
    directives: [ FilterTextComponent]
})
export class ResponsiveTableComponent implements OnInit {
    @Input() tableData: ITableData;
    @Input() filterColumns: string[] = [];
    @Output() switchEventChanged: EventEmitter<any>;
    @Output() editEventClicked: EventEmitter<any>;
    @Output() deleteEventClicked: EventEmitter<any>;
    @Output() refreshEventClicked: EventEmitter<any>;
    @Output() newEventClicked: EventEmitter<any>;

    private origDataList: any[];

    constructor() {
        this.switchEventChanged = new EventEmitter();
        this.editEventClicked = new EventEmitter();
        this.deleteEventClicked = new EventEmitter();
        this.refreshEventClicked = new EventEmitter();
        this.newEventClicked = new EventEmitter();
    }

    ngOnInit() {
    }

    filterChanged($event) {
        
        if ($event) {
            if (!this.origDataList) {
                this.origDataList = this.tableData.dataList;
            }
            var filteredList: any[] = [];
            this.origDataList.forEach((item) => {
                this.filterColumns.forEach((column) => {
                    if (item[column].toLowerCase().indexOf($event.toLowerCase()) != -1) {
                        filteredList.push(item);
                    }
                });
            });
            this.tableData.dataList = filteredList;
        }
        else {
            if (this.origDataList) {
                this.tableData.dataList = this.origDataList;
            }
            
        }
    }

    switchChanged(event: any, entity: any) {
        event.preventDefault();
        this.switchEventChanged.emit(entity);
    }

    editClicked(event: any, entity: any) {
        event.preventDefault();
        this.editEventClicked.emit(entity);
    }

    deleteClicked(event: any, entity: any) {
        event.preventDefault();
        this.deleteEventClicked.emit(entity);
    }

    refreshClicked(event: any) {
        event.preventDefault();
        this.refreshEventClicked.emit(null);
    }

    newClicked(event: any) {
        event.preventDefault();
        this.newEventClicked.emit(null);
    }
}

export function TableDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: () => {

    },
    template: `
    <table class="h-data-table" ng-transclude></table>
    `
  }
}

export class DataTableController {
  constructor($scope, TableDetailViewService){
    'ngInject';

    this.TableDetailViewService = TableDetailViewService;

    this.rows = this.options.data.map((item)=> item);

    this.buildPages();
    this.setPage();
  }

  buildPages(){
    this.pages = Array(Math.ceil(this.options.data.length / this.options.itemsPerPage))
      .fill(0)
      .map((item, index) => {
        return {
          page: index,
          label: index + 1,
          start: index * this.options.itemsPerPage,
          end: index * this.options.itemsPerPage + this.options.itemsPerPage
        };
      });
  }

  setPage(page){
    this.currentPage = page || this.pages[0];
  }

  showDetails(event, data){
    let targetRow = event.target;

    while (targetRow.parentNode){
      targetRow = targetRow.parentNode;
      if (targetRow.tagName === 'TR'){
        break;
      }
    }

    this.TableDetailViewService.showDetails(data, targetRow, `<div ng-click="deferred.reject()">kissa {{data.name}}</div>`);
  }
}


export function DataTableDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      options: '='
    },
    controller: DataTableController,
    bindToController: true,
    controllerAs: 'datatable',
    template: `
    <div class="data-table-wrapper">
      <h-table>
        <h-data-table-header>

          <h-data-table-header-cell
            ng-if="datatable.options.controls.left.length"
            class="table-row-controls">
          </h-data-table-header-cell>

          <h-data-table-header-cell
            ng-repeat="column in datatable.options.columns"
            ng-click="datatable.tableHeaderClick(column)"
            class="{{column.classNames || ''}}">
            {{column.label}}
          </h-data-table-header-cell>

          <h-data-table-header-cell
            ng-if="datatable.options.controls.right.length"
            class="table-row-controls">
          </h-data-table-header-cell>

        </h-data-table-header>

        <h-data-table-row-loader></h-data-table-row-loader>

        <h-data-table-row
          ng-click="datatable.showDetails($event, row)"
          ng-class="{
            'h-row-even' : $even,
            'h-row-odd' : $odd
          }"
          ng-repeat="row in datatable.rows | limitTo : datatable.options.itemsPerPage : datatable.currentPage.start">

          <h-table-row-controls
            ng-if="datatable.options.controls.left"
            class="table-row-controls-left"
            controls="datatable.options.controls.left">
          </h-table-row-controls>

          <h-table-cell
            data-cell-label="{{column.label}}: "
            class="h-data-table-data-cell {{column.classNames || ''}}"
            ng-repeat="column in datatable.options.columns">
              {{row[column.key]}}
          </h-table-cell>

          <h-table-row-controls
            ng-if="datatable.options.controls.right"
            class="table-row-controls-right"
            controls="datatable.options.controls.right">
          </h-table-row-controls>

        </h-data-table-row>
      </h-table>
      <h-table-page-select
        current-page="datatable.currentPage"
        pages="datatable.pages"
        select="datatable.setPage(page)">
      </h-table-page-select>
    </div>
    `
  }
}

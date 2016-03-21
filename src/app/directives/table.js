export function TableDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
    <table class="h-data-table" ng-transclude></table>
    `
  }
}


export class DataTableController {
  constructor($scope, TableDetailViewService){
    'ngInject';

    this.TableDetailViewService = TableDetailViewService;
    this.rows = [];
    this.pages = [];

    /**
     * watch data rows,
     * items per page,
     * and columns for change
     *
     * if change then rebuild all
     * @param  {[type]} ( [description]
     * @return {[type]}   [description]
     */
    $scope.$watch(()=>{
      return {
        data: this.options.data.length,
        itemsPerPage: this.options.itemsPerPage,
        columns: this.options.columns
      };
    }, () => this.filter(), true);


    /**
     * watch selected page change
     * only update view model offset
     * @param  {[type]} ( [description]
     * @return {[type]}   [description]
     */
    $scope.$watch(()=>{
      return this.page;
    }, () => this.setPage(this.page));
    /**
     * watch selected page change
     * only update view model offset
     * @param  {[type]} ( [description]
     * @return {[type]}   [description]
     */
    $scope.$watch(()=>{
      return this.options.filter;
    }, () => this.filter(), true);
  }


  /**
   * refresh pages model and set page index as data is
   * changed
   * @return {[type]} [description]
   */
  update(){
    this.buildPages();
    this.setPage(this.page || 0);
  }

  /**
   * construct a list of page objects to track
   * @return {[type]} [description]
   */
  buildPages(){
    if (this.options.paged){
      this.pages = Array(Math.ceil(this.rows.length / parseInt(this.options.itemsPerPage)))
        .fill(0)
        .map((item, index) => {
          return {
            index: index,
            page: index,
            label: index + 1,
            start: index * this.options.itemsPerPage
          };
        });
    } else {
      this.pages = [{
        page: 0,
        label: 0,
        start: 0
      }];
    }
  }

  /**
   * set page to desired index
   * @param {[type]} pageIndex [description]
   */
  setPage(pageIndex) {
    pageIndex = pageIndex < 0 ? 0 : pageIndex < this.pages.length - 1 ? pageIndex : this.pages.length - 1;
    pageIndex = pageIndex < 0 ? 0 : pageIndex;
    this._currentPage = this.pages[pageIndex];

    this.page = pageIndex;
    this.viewModel = this.getPage();
    this.TableDetailViewService.closeAll();
  }

  /**
   * get current page object
   * @return {[type]} [description]
   */
  getPage(){
    let page = this.pages[this.page] || {start: 0};
    return this.rows.slice(page.start, page.start + parseInt(this.options.itemsPerPage));
  }


  compareValues(value, value2) {
    value = (value + '').toLowerCase();
    value2 = (value2 + '').toLowerCase();

    return value.indexOf(value2) > -1;
  }

  filter(){
    let filter = this.options.filter;
    let filterFields = Object.keys(this.options.filter || {});

    this.rows = this.options.data.filter((item) => {
        return filterFields.every((field) => {
          return this.compareValues(item[field], filter[field]);
        });
    });

    this.update();
  }
  /**
   * show extra information
   * @param  {[type]} event [description]
   * @param  {[type]} data  [description]
   * @return {[type]}       [description]
   */
  showDetails(event, data){
    if (this.options.details){
      let targetRow = event.target;

      while (targetRow.parentNode){
        targetRow = targetRow.parentNode;
        if (targetRow.tagName === 'TR'){
          if (this.TableDetailViewService.isViewOpen(targetRow)){
            this.TableDetailViewService.closeView(targetRow);
          } else {
            this.TableDetailViewService.showDetails(data, targetRow, this.options.details.template);
          }

          break;
        }
      }
    }
  }
}


export function DataTableDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      page: '=?',
      options: '='
    },
    controller: DataTableController,
    bindToController: true,
    controllerAs: 'datatable',
    template: `
    <div class="data-table-container">
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


        <h-data-table-filter-row
          options="datatable.options">
        </h-data-table-filter-row>

        <h-data-table-row
          ng-click="datatable.showDetails($event, row)"
          ng-class="{
            'h-row-even' : $even,
            'h-row-odd' : $odd
          }"
          ng-repeat="row in datatable.viewModel track by $index">

          <h-table-row-controls
            ng-if="datatable.options.controls.left"
            class="table-row-controls-left"
            controls="datatable.options.controls.left">
          </h-table-row-controls>

          <h-table-cell
            data-cell-label="{{column.label}}: "
            class="h-data-table-data-cell {{column.classNames || ''}}"
            ng-repeat="column in datatable.options.columns">
              {{column.valueFilter ? column.valueFilter(row[column.key], row) : row[column.key]}}
          </h-table-cell>

          <h-table-row-controls
            ng-if="datatable.options.controls.right"
            class="table-row-controls-right"
            controls="datatable.options.controls.right">
          </h-table-row-controls>

        </h-data-table-row>
      </h-table>
      </div>
      <h-table-page-select
        ng-if="datatable.options.paged"
        page="datatable.page"
        pages="datatable.pages">
      </h-table-page-select>
    </div>
    `
  }
}

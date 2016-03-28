export class DataTableController {
  constructor($scope, TableDetailViewService, DataTableService, $timeout){
    'ngInject';

    this.$timeout = $timeout;
    this.TableDetailViewService = TableDetailViewService;
    this.DataTableService = DataTableService;
    this.rows = [];
    this.pages = [];
    this.page = 0;

    /**
     * watch selected page change
     * only update view model offset
     * @param  {[type]} ( [description]
     * @return {[type]}   [description]
     */
    $scope.$watch(()=>{
      return this.page;
    }, () => {
      this.setPage(this.page);
    });


    /**
     * watch data and options change
     * trigger full update when changed
     * @param  {[type]} ( [description]
     * @return {[type]}   [description]
     */
    $scope.$watchCollection(()=>{
      return {
        order: this.options.orderBy,
        data: this.data,
        paged: this.options.paged,
        itemsPerPage: this.options.itemsPerPage,
        columns: this.options.columns,
        filter: this.options.filter
      };
    }, () => {
      this.update();
    });

  }

  /**
   * set page to desired index
   * @param {[type]} pageIndex [description]
   */
  setPage(pageIndex) {
    pageIndex = pageIndex || 0;
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
    return this.options.paged ? this.rows.slice(page.start, page.start + parseInt(this.options.itemsPerPage)) : this.rows;
  }

  /**
   * toggle sorter when header cell is clicked
   * @param  {[type]} column [description]
   * @return {[type]}        [description]
   */
  toggleSort(column){
    if (this.options.orderBy.key === column.key){
      if (!this.options.orderBy.reverse){
        this.options.orderBy.reverse = true;
        return;
      }

      this.options.orderBy.key = null;
      this.options.orderBy.reverse = false;
      return;
    }

    this.options.orderBy.key = column.key;
    this.options.orderBy.reverse = false;
  }


  /**
   * update list view model
   * @return {[type]} [description]
   */
  update(){
    this.rows = this.DataTableService.filter(this.data, this.options.filter);

    if (this.options.orderBy && this.options.orderBy.key){
      this.DataTableService.orderBy(this.rows, this.options.orderBy.key, this.options.orderBy.reverse);
    }

    if (this.options.paged){
      this.pages = this.DataTableService.buildPages(this.rows, this.options.itemsPerPage);
    } else {
      this.pages = [{
        page: 0,
        label: 0,
        start: 0
      }];
    }

    this.setPage(this.page || 0);
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
      data: '=',
      page: '=?',
      options: '='
    },
    controller: DataTableController,
    bindToController: true,
    controllerAs: 'datatable',
    template: `
    <div class="data-table-container">

      <h-table-page-select
        ng-if="datatable.options.paged"
        page="datatable.page"
        pages="datatable.pages">
      </h-table-page-select>

      <table class="h-data-table">
        <tr class="h-table-header-row">
          <th
            ng-if="datatable.options.controls.left.length"
            class="h-table-header-cell h-table-row-controls">
          </th>
          <th
            ng-repeat="column in datatable.options.columns"
            ng-click="datatable.toggleSort(column)"
            class="h-table-header-cell {{column.classNames || ''}}"
            ng-class="{
              'h-sort-active' : datatable.options.orderBy.key === column.key,
              'h-sort-reverse' : datatable.options.orderBy.key === column.key && datatable.options.orderBy.reverse
            }">
            <div class="h-header-content">
              <span class="h-header-label">{{column.label}}</span>
            </div>
          </th>
          <th
            ng-if="datatable.options.controls.right.length"
            class="h-table-header-cell h-table-row-controls">
          </th>
        </tr>

        <h-data-table-row-loader></h-data-table-row-loader>

        <tr
          ng-if="datatable.options.rowFilter"
          h-data-table-filter-row options="datatable.options"
          class="h-table-filter-row">
        </tr>

        <tr
          h-table-row
          row="row"
          class="h-table-row"
          ng-click="datatable.showDetails($event, row)"
          ng-repeat="row in datatable.viewModel track by $index">
        </tr>

      </table>

      <h-table-page-select
        ng-if="datatable.options.paged"
        page="datatable.page"
        pages="datatable.pages">
      </h-table-page-select>

    </div>
    `
  }
}

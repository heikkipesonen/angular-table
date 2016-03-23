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
    $scope.$watch(()=>{
      return {
        data: this.data,
        paged: this.options.paged,
        itemsPerPage: this.options.itemsPerPage,
        columns: this.options.columns,
        filter: this.options.filter
      };
    }, () => {
      this.update();
    }, true);

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

  update(){
    this.rows = this.DataTableService.filter(this.data, this.options.filter);
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
      <div class="data-table-wrapper">
        <table class="h-data-table"
          options="datatable.options"
          rows="datatable.viewModel"
          h-data-table-rows>
        </table>
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

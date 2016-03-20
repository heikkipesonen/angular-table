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
export function DataTableDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      options: '='
    },
    controller: ($scope) => {
      'ngInject';

      $scope.pages = Array(Math.ceil($scope.options.data.length / $scope.options.itemsPerPage)).fill(0).map((item, index) => {
        return {
          page: index,
          label: index + 1,
          start: index * $scope.options.itemsPerPage,
          end: index * $scope.options.itemsPerPage + $scope.options.itemsPerPage
        };
      });

      $scope.setPage = (page) => {
        $scope.currentPage = page;
        console.log(page);
      }
      $scope.setPage($scope.pages[0]);
      console.log($scope.currentPage)
    },
    template: `
    <div class="data-table-wrapper">
      <h-table>
        <h-data-table-header>

          <h-data-table-header-cell ng-if="options.controls.left.length" class="table-row-controls"></h-data-table-header-cell>

          <h-data-table-header-cell
            class="{{column.classNames || ''}}"
            ng-click="tableHeaderClick(column)"
            ng-repeat="column in options.columns">
            {{column.label}}
          </h-data-table-header-cell>

          <h-data-table-header-cell ng-if="options.controls.right.length" class="table-row-controls"></h-data-table-header-cell>
        </h-data-table-header>

        <h-data-table-row-loader></h-data-table-row-loader>

        <h-data-table-row
          ng-class="{
            'h-row-even' : $even,
            'h-row-odd' : $odd
          }"
          ng-repeat="row in options.data | limitTo : options.itemsPerPage : currentPage.start track by $index">

          <h-table-row-controls
            ng-if="options.controls.left"
            class="table-row-controls-left"
            controls="options.controls.left">
          </h-table-row-controls>

          <h-table-cell
            data-cell-label="{{column.label}}: "
            class="h-data-table-data-cell {{column.classNames || ''}}"
            ng-repeat="column in options.columns">
              {{row[column.key]}}
          </h-table-cell>


          <h-table-row-controls
            ng-if="options.controls.right"
            class="table-row-controls-right"
            controls="options.controls.right">
          </h-table-row-controls>

        </h-data-table-row>

        <h-data-table-row class="h-page-select">
          <h-table-cell colspan="999">
            <div class="h-page-select-wrapper">
              <div class="h-page-select-scroll">
                <div class="h-page-select"
                  ng-class="{'h-page-selector-active' : pageSelector === currentPage}"
                  ng-repeat="pageSelector in pages"
                  ng-click="setPage(pageSelector)">
                  {{pageSelector.label}}
                </div>
              </div>
            </div>
          </h-table-cell>
        </h-data-table-row>

      </h-table>
    </div>
    `
  }
}

export function DataTableFilterRowDirective(){
  return {
    restrict: 'A',
    scope: {
      options: '='
    },
    controller: function DataTableFilterController($scope) {
      'ngInject';

      $scope.filterItems = 0;
      let update = () => {

        if (!$scope.options.filter){
          return;
        }

        $scope.filterItems = Object.keys($scope.options.filter).reduce((maxValue, filterKey) => {
          return $scope.options.filter[filterKey].length > maxValue ? $scope.options.filter[filterKey].length : maxValue;
        }, 0);

      };


      $scope.$watch(()=>{
        return $scope.options.filter;
      }, () => {
        update();
      }, true);
    },
    template: `
      <td ng-if="options.controls.left.length"></td>
      <td class="h-table-filter-cell" ng-repeat="column in options.columns">
        <input type="text" ng-model="options.filter[column.key]" placeholder="{{column.label}}"/>
      </td>
      <td ng-if="options.controls.right.length"></td>
    `
  }
}

export function TableCellDirective(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: `
      <td class="table-cell" ng-transclude></td>
    `
  }
}

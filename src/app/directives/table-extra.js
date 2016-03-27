
export function TableRowLoaderDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      loading: '=?'
    },
    template: `
    <tr class="h-table-row h-data-table-loader" ng-class="{'h-data-table-loader-loading' : loading}">
      <td class="h-data-table-loader-cell" colspan="9999"></td>
    </tr>
    `
  };
}


export function TableRowLoaderDirective(){
  return {
    restrict: 'A',
    template: `
      <td colspan="9999" class="h-data-table-loader-cell h-data-table-loader"></td>
    `
  };
}

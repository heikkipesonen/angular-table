
function renderTableRowControls(controls){
  let controlTemplate = controls.map((control) => {
    return `
      <div class="h-table-row-icon">
        <i class="${control.icon}"></i>
      </div>
    `;
  }).join('');


  return `<td class="h-table-row-controls">${controlTemplate}</td>`;
}

function renderTableRow(rowdata, columns, classNames){
  return columns.map((column) => {
    return `<td
        data-column-key="${column.key}"
        data-column-label="${column.label}"
        class="h-table-cell ${classNames || ''}">
        ${rowdata[column.key] || ''}
      </td>`
  }).join('');
}


export function DataTableRowDirective($compile){
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      row: '='
    },
    require: '^hDataTable',
    link: ($scope, $element, $attrs, dataTableController) => {
      let element = $element[0];
      $scope.$watchCollection(() => $scope.row, () => {
        let rowClass = dataTableController.viewModel.indexOf($scope.row) % 2 > 0 ? 'h-table-row-odd' : 'h-table-row-even';

        let rowHtml = renderTableRow($scope.row, dataTableController.options.columns);
        let leftControls = renderTableRowControls(dataTableController.options.controls.left);
        let rightControls = renderTableRowControls(dataTableController.options.controls.right);

        element.classList.add(rowClass);
        element.innerHTML = leftControls + rowHtml + rightControls;
      });
    }
  }
}

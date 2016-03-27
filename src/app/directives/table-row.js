
/**
 * render row controls to string
 * @param  {[type]} controls [description]
 * @return {[type]}          [description]
 */
function renderTableRowControls(controls, trackingName){
  let controlTemplate = controls.map((control, index) => {
    return `
      <div class="h-table-row-icon h-table-row-control"
        data-tracking-name="${trackingName}"
        data-tracking-index="${index}">
        <i class="${control.icon}"></i>
      </div>
    `;
  }).join('');

  return `<td class="h-table-row-controls">${controlTemplate}</td>`;
}


/**
 * "render" table row to string
 * @param  {[type]} rowdata    [description]
 * @param  {[type]} columns    [description]
 * @param  {[type]} classNames [description]
 * @return {[type]}            [description]
 */
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

/**
 * experimental table row rendering thingy....
 */
export function DataTableRowDirective(){
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      row: '='
    },
    require: '^hDataTable',
    link: ($scope, $element, $attrs, dataTableController) => {

      // render table row contents as String
      // for faster update, $compile takes horrible amounts
      // of time and using the angular way of rendering hundreds
      // of items results thousands of watchers....
      //
      //
      // ...so...

      let rowClassName = dataTableController.viewModel.indexOf($scope.row) % 2 > 0 ? 'h-table-row-odd' : 'h-table-row-even';
      let rowElement = renderTableRow($scope.row, dataTableController.options.columns);
      let leftControls = renderTableRowControls(dataTableController.options.controls.left, 'left');
      let rightControls = renderTableRowControls(dataTableController.options.controls.right, 'right');

      $element[0].classList.add(rowClassName);
      $element[0].innerHTML = leftControls + rowElement + rightControls;

      let rowCells = $element[0].querySelectorAll('.h-table-cell');


      // TODO: refactor this shite
      // implement better way to trigger click events
      // $compile is too slow... :(
      //
      // click listener
      //
      // bind click event to all h-table-row-control items
      // hacky way of data-attributes provides route to controller options
      // which contain callbacks for tool usages
      let rowControls = $element[0].querySelectorAll('.h-table-row-control');

      for (var i = 0; i < rowControls.length; i++){
        let control = rowControls[i];
        control.addEventListener('click', (evt) => {
          evt.stopPropagation();
          dataTableController
            .options
            .controls[control.getAttribute('data-tracking-name')]
            [control.getAttribute('data-tracking-index')]
            .onclick($scope.row, $element[0], control, $scope);
        });
      }

      // update whole row at once
      // update every cell content when something changed
      $scope.$watchCollection(() => $scope.row, () => {
        for (var i = 0; i < rowCells.length; i++){
          rowCells[i].innerHTML = $scope.row[rowCells[i].getAttribute('data-column-key')];

        }
      });
    }
  }
}

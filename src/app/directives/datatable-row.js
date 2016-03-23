function compileRowControls(controls) {
  let controlsTemplate = controls.map((control) => {
    return `
      <div class="h-table-row-icon" click>
        <i class="${control.icon}"></i>
      </div>
    `;
  }).join('');

  return `
    <td class="h-table-row-controls">
      <div class="table-cell-content">
        ${controlsTemplate}
      </div>
    </td>`;
}

function compileCell(column, row, options) {
  return `
    <td
      data-cell-label="${column.label}: "
      class="h-data-table-data-cell ${column.classNames}">
        ${row[column.key]}
    </td>`;
}


function compileRow(row, options, classNames, rowIndex, controlsLeft, controlsRight){
  let rowContent = options.columns.map((column) => {
      return compileCell(column, row, options);
    }).join('');

  return `
  <tr
    click="${rowIndex}"
    class="h-table-row ${classNames}">
    ${controlsLeft}

    ${rowContent}

    ${controlsRight}
  </tr>`
}

function compileHeaderCells(options) {
  return options.columns.map((column) => {
    return `
      <th
        click
        class="h-table-header-cell ${column.classNames || ''}">
        ${column.label}
      </th>
    `;
  }).join('');
}

function compileHeader(options){
  return `
    <tr class="h-table-header-row">
      <th
        class="h-table-header-cell h-table-row-controls">
      </th>
      ${compileHeaderCells(options)}
      <th
        class="h-table-header-cell h-table-row-controls">
      </th>
    </tr>
    `;
}

export function RowCompile(rows, options){
  let controlsLeft = options.controls ? compileRowControls(options.controls.left) : '';
  let controlsRight = options.controls ? compileRowControls(options.controls.right) : '';

  let headers = compileHeader(options);

  return headers + rows.map((row, index) => {
    let odd = index % 2 > 0;
    return compileRow(row, options, odd ? 'h-row-odd' : 'h-row-even', index, controlsLeft, controlsRight);
  }).join('');
}

export function DataTableRowsDirective(){
  return {
    restrict: 'A',
    scope: {
      options: '=',
      rows: '='
    },
    link: ($scope, $element) => {
      $element[0].addEventListener('click', ($event) => {
        let target = $event.target;
        while (target.parentNode){
          if (target.hasAttribute('click')){
            break;
          }

          target = target.parentNode;
        }

        console.log(target.getAttribute('click'));
      });

      $scope.$watch(() => {
        return $scope.rows;
      }, () => {
        if ($scope.rows && $scope.options){
          console.time('rows');
          $element[0].innerHTML = RowCompile($scope.rows || [], $scope.options || {});
          console.timeEnd('rows');
        }
      });
    }
  }
}

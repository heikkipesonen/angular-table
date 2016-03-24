



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

function compileRow(row, options, classNames){
  let controlsLeft = options.controls ? compileRowControls(options.controls.left) : '';
  let controlsRight = options.controls ? compileRowControls(options.controls.right) : '';

  let rowContent = options.columns.map((column) => {
    return `
      <td
        data-cell-label="${column.label}: "
        class="h-data-table-data-cell ${column.classNames}">
          ${row[column.key]}
      </td>`;
    }).join('');

  return `
  <tr
    class="h-table-row ${classNames}">
    ${controlsLeft}

    ${rowContent}

    ${controlsRight}
  </tr>`
}

function compileTable(rows, options){
  let headers = compileHeader(options);
  return headers + rows.map((row, index) => {
    let odd = index % 2 > 0;
    return compileRow(row, options, odd ? 'h-row-odd' : 'h-row-even');
  }).join('');
}

export function DataTableRowDirective() {
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    compile: function() {
      return {
        pre: function ($scope, iElement){
            iElement[0].innerHTML = compileRow($scope);
        }
      };
    }
  }
}


export function DataTableRowsDirective($compile){
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      options: '=',
      rows: '='
    },
    compile: function () {
      return {
        pre: function($scope, iElement) {
          console.log($scope.rows, $scope.options);
          let template = compileTable($scope.rows, $scope.options);
          let el = $compile(template)($scope);
          console.log(el);
          console.log(iElement)
          iElement.append(el);
        }
      }
    }
  };
}

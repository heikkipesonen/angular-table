# Data-displaying-table-thing

a kind-of-simple angular directive for displaying data on responsive tables.

this is intended to be primarily for displaying lists of data in simple and efficient way, and provide some sort of resposive design, even though using tables.

this is still under preliminary development so it should not be used by anyone except extremely masochistic persons.


# installation

not currently, need to create a build....

---

## Features not desired by anyone

actions that result everything exploding
- changing column order
- updating columns when table is rendered
..maybe

## Features

- works almost like angular directive should,
  - manipulate data somewhere, display with this directive
  - should update automatically  
- relatively fast render, with hundreds of rows at once
- only few watches per row, regardless of cell count
- pagination
- cell templating (not $compiled, so only html markup)
- cell value filtering (not $filter, do it yourself)
- simple (read: barely useful) functionalities for
  - filtering
  - sorting
- row icons / buttons


currently watches changes on (ie. things that can be changed when live):
```javascript
page: pagenumber
order: this.options.orderBy,
data: this.data, // reference change only
paged: this.options.paged,
itemsPerPage: this.options.itemsPerPage,
columns: this.options.columns,
filter: this.options.filter
```
##### features could be or may be under development

- extra content display (new row rendered)  
  -  controllers, scope and better templates
- configurable filters and sorters ($provider)
- provide data as promise

## Usage
```HTML
  <h-data-table data="data" options="options" page="pageNumber"></h-data-table>
```

```javascript
data = [
  {
    key: 'value',
    key: 'value',
    key: 'value',
  },
  {
    key: 'value',
    key: 'value',
    key: 'value',
  }
  ...
]
```
### options

horribly complex options object to be provided for the table directive to correctly display the data and customize output.

only `columns` is required to be defined

```javascript
dataTableOptions = {

  /**
   * enable filter inputs under the table header
   * @type {Boolean}
   */
  rowFilter: false,
  /**
   * is table paged or all items displayed at once?
   * @type {Boolean}
   */
  paged: true,

  /**
   * if paged, how many items shown at once?
   * @type {Number}
   */
  itemsPerPage: 100,

  /**
   * does table have detailed view of items?
   * rowclick opens new row underneath the original one
   * @type {Object}
   */
  details: {
    /**
     * details view (row clicked)
     * row data is provided as data into template scope
     * @type {String}
     */
    template: '<h2>{{data.name}}</h2>'
  },


  /**
   * row odering
   * key: name of the property in object for value to sort by
   * reverse: sort reversal
   *
   * @type {Object}
   */
  orderBy: {
    key: 'name',
    reverse: false
  },

  /**
   * columns to display
   * @type {Array}
   */
  columns:[
    {

      /**
       * object key to use as value
       * @type {String}
       */
      key: 'name',

      /**
       * label for column
       * @type {String}
       */
      label: 'Name',

      /**
       * classnames to add to the table cell
       * @type {String}
       */
      classNames: 'col-lt-md-hide',

      /**
       * custom template to wrap cell content
       * not $compiled
       *
       * {{content}} will be replaced with (filtered) cell content
       * @type {String}
       */
      cellTemplate: '<div class="kissa">{{content}}</div>'
    },

    {
      key: 'available',
      label:'Available',
      classNames: 'fit-content text-center',

      /**
       * cell content filter applied once
       * when cell is rendered
       *
       * @param  {[type]} content content of current cell without filter
       * @param  {[type]} row     row of current cell
       * @return {[type]}         string to append into dom
       */
      filter: function(content, row) {
        return content + '&nbsp;' + row.unit;
      }
    },
    ...
  ],

  /**
   * row control buttons
   * @type {Object}
   */
  controls: {

    /**
     * left side (before cells)
     * @type {Array}
     */
    left: [
      {

        /**
         * icon class to add to button
         * @type {String}
         */
        icon: 'ion-ios-plus-outline',

        /**
         * callback to trigger when control is pressed
         * @return {[type]} [description]
         */
        onclick: (...args) => {
          console.log('button 1 on left', args);
        }
      },
      {
        icon: 'ion-ios-search-strong',
        onclick: () => {
          console.log('button 2 on left');
        }
      }
    ],

    /**
     * the other side (after the cells)
     * @type {Array}
     */
    right: [
      {
        icon: 'ion-ios-email-outline',
        onclick: () => {
          console.log('button 3');
        }
      },
      {
        icon: 'ion-ios-email',
        onclick: () => {
          console.log('button 4');
        }
      },
      {
        icon: 'ion-ios-close-outline',
        onclick: () => {
          console.log('button 5');
        }
      }
    ]
  }
}
```
---
# License
MIT

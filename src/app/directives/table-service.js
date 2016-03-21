export class DataTableService {
  constructor(){

  }

  compareValues(item, filter) {
    item = (item + '').toLowerCase();

    if (filter instanceof Array){
      return filter.every((filterEntry) => {
        return item.indexOf((filterEntry + '').toLowerCase()) > -1;
      });
    }

    return item.indexOf((filter + '').toLowerCase()) > -1;
  }

  filter(rows = [], filterModel = {}){
    let filterFields = Object.keys(filterModel || {});

    return rows.filter((item) => {
        return filterFields.every((field) => {
          return this.compareValues(item[field], filterModel[field]);
        });
    });
  }

  /**
   * construct a list of page objects to track
   * @return {[type]} [description]
   */
  buildPages(rows, itemsPerPage){
    return Array(Math.ceil(rows.length / parseInt(itemsPerPage)))
      .fill(0)
      .map((item, index) => {
        return {
          index: index,
          page: index,
          label: index + 1,
          start: index * itemsPerPage
        };
      });
  }
}

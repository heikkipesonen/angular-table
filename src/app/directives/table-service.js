export class DataTableService {
  constructor(){

  }

  orderBy(source, property, reverse){
    source.sort((a,b) => {
      let av = a[property].toString().trim().toLowerCase();
      let bv = b[property].toString().trim().toLowerCase();

      if (!!parseFloat(av) && !!parseFloat(bv)){
          av = parseFloat(av);
          bv = parseFloat(bv);
      }

      return av > bv ? 1 : av < bv ? -1 : 0;
    });

    if (reverse){
      source.reverse();
    }

    return source;
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

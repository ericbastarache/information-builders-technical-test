import React, { Component } from 'react';
import InputComponent from 'components/InputComponent';
import TableComponent from 'components/TableComponent';
import axios from 'axios';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faChevronUp,
  faChevronDown
);
const headerData = [
  {
    id: 1,
    name: 'date',
    label: 'Date'
  },
  {
    id: 2,
    name: 'state',
    label: 'US State',
  },
  {
    id: 3,
    name: 'storeType',
    label: 'Store Type',
  },
  {
    id: 4,
    name: 'brandType',
    label: 'Brand Type',
  },
  {
    id: 5,
    name: 'brand',
    label: 'Brand',
  },
  {
    id: 6,
    name: 'model',
    label: 'Model',
  },
  {
    id: 7,
    name: 'sold',
    label: 'Quantity Sold',
  },
  {
    id: 8,
    name: 'revenue',
    label: 'Revenue',
  }
]

class App extends Component {

  _isMounted = false;
  state = {
    value: '',
    data: [],
    sorting: false,
    sortable: [],
    sorted: [],
    filterColumn: 'date',
  }
  componentDidMount () {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/',
        responseType: 'json'
      }).then((response) => {
        let column = this.state.filterColumn;
        const defaultSort = response.data.data.sort((a, b) => {
          return column === 'date' ? a[column].localeCompare(b[column]) : null;
        });
        this.setState({data: defaultSort});
      }).catch((err) => {
        console.error(err);
      });
      let arrayOfKeys = [];
      this.setState({items: this.state.filtered});
      headerData.reduce((acc, val) => {
        return arrayOfKeys.push(val.name);
      }, []);
      this.setState({sorted: arrayOfKeys});
  }
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }
  handleSort = column => (e) => {
    const toSort = column.filter((col) => {
      return col === e.target.id;
    });
    this.setState({filterColumn: toSort, sorting: !this.state.sorting});
    const sortableList = this.state.data.sort((a, b) => {
      if (toSort === 'date') {
        a[toSort].localeCompare(b[toSort]);
      }
      if (toSort.toString() === 'revenue' || toSort.toString() === 'sold') {
        let num1 = parseInt(a[toSort]);
        let num2 = parseInt(b[toSort]);
        return this.state.sorting ? num1 - num2 : num2 - num1;
      }
        return (this.state.sorting ? (a[toSort] > b[toSort] ? 1 : a[toSort] < b[toSort] ? -1 : 0) : null);
    });

    this.setState({
      sortable: sortableList,
    });
  }
  render() {
    const filteredData = [...this.state.data].filter(row => {
      return row.brand.toLowerCase().includes(this.state.value) ||
      row.state.toLowerCase().includes(this.state.value) ||
      row.storeType.toLowerCase().includes(this.state.value) ||
      row.brandType.toLowerCase().includes(this.state.value) ||
      row.model.toLowerCase().includes(this.state.value) ||
      row.sold.toLowerCase().includes(this.state.value) ||
      row.revenue.toLowerCase().includes(this.state.value) ||
      row.date.includes(this.state.value);
    });
    return (
      <div className="App">
        <InputComponent
          label='Filter records'
          name="filter-records"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <TableComponent
          sorting={this.state.sorting}
          filterIcon={this.state.filterColumn}
          handleSort={this.handleSort(this.state.sorted)}
          headerData={headerData}
          data={filteredData}
        />
      </div>
    );
  }
}

export default App;

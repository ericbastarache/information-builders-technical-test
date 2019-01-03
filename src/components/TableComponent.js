import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class TableComponent extends React.Component {
  render () {
    const {
      data,
      headerData,
      handleSort,
      filterIcon,
      sorting,
    } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {headerData
              .map(column => {
              return (
                <>
                  <TableCell
                    id={column.name}
                    onClick={handleSort}
                    className='table-columns'
                    key={`col-${column.id}`}
                  >
                    {column.label}
                    {
                      (filterIcon.toString() === column.name ? (sorting ? <FontAwesomeIcon key={`ico-${column.id}`} icon='chevron-up' /> : <FontAwesomeIcon key={`ico-${column.id}`} icon='chevron-down' />) : null)
                    }
                  </TableCell>
                </>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
          .map(row => {
            return (
              <TableRow key={`row-${row.id}`}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.storeType}</TableCell>
                <TableCell>{row.brandType}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.sold}</TableCell>
                <TableCell>{row.revenue}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

export default TableComponent;
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {useSortBy, useTable} from 'react-table';
import './style.css'

import { QUERY_SCORES } from '../../utils/queries';

function Scores() {
    const {loading, data} = useQuery(QUERY_SCORES);
    // console.log(data); 
    //instead of using this hardcoded data, have a function to retrieve data from database
    const myData = React.useMemo(
     () => [ 
           {
                 score: 10,
                category: "History",
                   createdAt: "06/04/2000"
            },
            {
                score: 20,
               category: "History",
                  createdAt: "06/04/2000"
           },
    ],
    []
)

    const columns = React.useMemo(
        () => [
            {
                id: "score",
                Header: "Score",
                accessor: (row) => row.score,
            },
            {
                id: "category",
                Header: "Category",
                accessor: (row) => row.category,
            },
            {
                id: "createdAt", 
                Header: "Created At",
                accessor: (row) => row.createdAt,
                
            }
        ],
        []
    )

    
 const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: myData}, useSortBy
  )

    return (
       <div className="scores-container">
            <div>
                <h1>High Scores</h1>
            </div>
            <div className="table">
                <table {...getTableProps()} style={{border: 'solid 1px yellow'}}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th 
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        color: 'aquamarine'
                                    }}>
                                    {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? '🔽'
                                                    : '🔼'
                                                : ''}
                                        </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td 
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '1px',
                                                border: 'solid 1px green',
                                                color: 'blue'
                                            }}>
                                                {cell.render('Cell')}
                                            </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scores;
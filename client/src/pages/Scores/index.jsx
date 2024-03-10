import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {useSortBy, useTable} from 'react-table';
import './style.css'


function Scores() {
    //instead of using this hardcoded data, have a function to retrieve data from database
    const data = React.useMemo(
        () => [ 
            {
                name: "Monkey D. Luffy",
                score: 1
            },
            {
                name: "Roronoa Zoro",
                score: 3
            },
            {
                name: "Nami",
                score: 43
            },
            {
                name: "Usopp",
                score: 323
            },
            {
                name: "Sanji",
                score: 30
            },

            
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: "Name                ",
                accessor: "name",
            },
            {
                Header: "Score",
                accessor: "score",
            },
        ],
        []
    )

    
 const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data },
    useSortBy)

    return (
        <>
       <section>
       <div>
            <h1>HIGH SCORES</h1>
        </div>

        <div>
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
                                    }}
                                >
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
                                            color: 'white'
                                        }}
                                        >
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
    </section>

      
        </>
    );
};

export default Scores;
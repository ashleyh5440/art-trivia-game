import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSortBy, useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import './style.css'

import { QUERY_SCORES } from '../../utils/queries';

import Auth from '../../utils/auth';

function Scores() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/');
            return;
        } else {
            const profile = Auth.getProfile();
            setUsername(profile.data.username);

        // console.log("Querying scores for userId:", userId);
        }


    }, [navigate]);

    const { loading, error, data } = useQuery(QUERY_SCORES, {
        skip: !Auth.loggedIn(),
        // variables: { userId },
    });

    //    const myData = React.useMemo (
    //     () => [
    //         {
    //             score: 10, 
    //             category: "History",
    //             createdAt: "06/04/2000"
    //         }
    //     ]
    //    )
    console.log(data);


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


    const scoresData = React.useMemo(() => {
        if (!data) return [];
        console.log(data.getUserScores.map(({ score, category, createdAt }) => ({
            score,
            category,
            createdAt,
        })));
        return data.getUserScores.map(({ score, category, createdAt }) => ({
            score,
            category,
            createdAt,
        }));
    }, [data]);


    //  const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    //   } = useTable({ columns, data: myData}, useSortBy
    //   )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: scoresData }, useSortBy);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div className="scores-container">

            {/* <div>
    <h2>User Scores</h2>
    {data.getUserScores.map(({ _id, category, score, createdAt }) => (
      <div key={_id}>
        <p>Category: {category}</p>
        <p>Score: {score}</p>
        <p>Date: {createdAt}</p>
      </div>
    ))}
  </div> */}

            <div>
                <h1> {username ? `${username}'s High Scores` : "High Scores"} </h1>
            </div>
            <div className="table">

                <table {...getTableProps()} style={{ border: 'solid 1px red' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        style={{
                                            borderBottom: 'solid 3px green',
                                            color: 'black'
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
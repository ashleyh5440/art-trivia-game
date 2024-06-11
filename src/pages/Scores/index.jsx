import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
import { useSortBy, useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import './style.css'
import Button from 'react-bootstrap/Button';

// import { QUERY_SCORES } from '../../utils/queries';

// import Auth from '../../utils/auth';

function Scores() {
    // const navigate = useNavigate();
    // const [username, setUsername] = useState('');

    // useEffect(() => {
    //     if (!Auth.loggedIn()) {
    //         navigate('/');
    //         return;
    //     } else {
    //         const profile = Auth.getProfile();
    //         setUsername(profile.data.username);
    //     }


    // }, [navigate]);

    // const { loading, error, data } = useQuery(QUERY_SCORES, {
    //     skip: !Auth.loggedIn(),
    // });

    const columns = React.useMemo(
        () => [
            {
                id: "category",
                Header: "Category",
                accessor: (row) => row.category,
            },
            {
                id: "score",
                Header: "Score",
                accessor: (row) => row.score,
            },
            // {
            //     id: "createdAt",
            //     Header: "Created At",
            //     accessor: (row) => row.createdAt,

            // }
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
        <div className="pDot1"></div>
        <div className="pDot"></div>
        <div className="bDot1"></div>
        <div className="bDot"></div>

            <div>
                <h1> {username ? `${username}'s High Scores` : "High Scores"} </h1>
            </div>
            <div className="table">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                                                {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Button className="save-score-btn" variant="primary">Save score</Button>
            </div>
        </div>
    );
};

export default Scores;
import React, { useState, useEffect } from "react";

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';




// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            );
                            })}
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            
                  <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5,10, 20, 30, 40, 50, 100, 200].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </div>
    )
}





function FilterTableComponent( props ) {

    const [columnsFinish, setColumnsFinish] = useState([])

    useEffect(() => {
        const createColumns = () => {
            let columnsJson=[];
            let i = 0 
            for (var key in props.data[0]) {
                if((i > 0) /*&& (i < 5)*/){
                    columnsJson.push(key)
                } 
  
                i = i + 1
            }

            setColumnsFinish(columnsJson.map((key) => {
                return {Header: key, accessor: key}
            }))

        }
        createColumns();
    }, [])
    

    const columns = [
            {
                Header: 'Countries',
                columns: [
                    {
                        Header: 'Country Name',
                        accessor: 'country',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: columnsFinish
            },
        ]

    const data = props.data
    return (
        <div>
            {columns.length > 0 && <Table columns={columns} data={data} />}
        </div>
    )
}

export default FilterTableComponent;
import React, { useState, useMemo, type FC, type ReactElement } from "react";
import { TablePropTypes } from "../shapes";

const TableWithFilter: FC<TablePropTypes> = ({
  tableData,
  searchWithKey,
  columnKeys,
  renderAction,
}) => {
  const [searchInput, setInput] = useState("");

  function handleInputChange(event: React.BaseSyntheticEvent) {
    setInput(event.target.value);
  }

  const filteredData = useMemo(() => {
    return tableData.length > 0
      ? tableData.filter((data) =>
          String(data[searchWithKey])
            .toLowerCase()
            .includes(searchInput.trim().toLowerCase())
        )
      : tableData;
  }, [tableData, searchInput]);

  return (
    <>
      <input
        name="search"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search Person"
      />
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 &&
            filteredData.map((data) => (
              <tr key={crypto.randomUUID()}>
                {columnKeys.map((key) => (
                  <td>{data[key] ?? renderAction(data)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {/* <div className="pagination">
        <span className="button">
          <button
            name="prev"
            disabled={page === 1}
            onClick={handleClickPagination}
          >
            {"<<"}
          </button>
        </span>
        <span>{page}</span>
        <span className="button">
          <button name="next" onClick={handleClickPagination}>
            {">>"}
          </button>
        </span>
      </div> */}
    </>
  );
};

export default TableWithFilter;

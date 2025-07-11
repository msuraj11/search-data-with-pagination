import React, { useState, useMemo } from "react";
import { TablePropTypes } from "../shapes";
import Pagination from "./Pagination";

const TableWithFilter: React.FC<TablePropTypes> = ({
  tableData,
  searchWithKey = "",
  columnKeys,
  renderAction,
  paginationProps,
  skipFilter = false,
  showLoader = false,
}) => {
  const [searchInput, setInput] = useState("");

  function handleInputChange(event: React.BaseSyntheticEvent) {
    setInput(event.target.value);
  }

  const filteredData = useMemo(() => {
    return tableData.length > 0 && searchWithKey && !skipFilter
      ? tableData.filter((data) =>
          String(data[searchWithKey])
            .toLowerCase()
            .includes(searchInput.trim().toLowerCase())
        )
      : tableData;
  }, [tableData, searchInput]);

  let renderTbody = null;
  if (showLoader) {
    renderTbody = "Loading ....";
  } else {
    renderTbody =
      filteredData?.length > 0
        ? filteredData.map((data) => (
            <tr key={Math.random().toString(16).slice(2)}>
              {columnKeys.map((key) => (
                <td>{data[key] ?? renderAction(data)}</td>
              ))}
            </tr>
          ))
        : null;
  }

  return (
    <>
      {!skipFilter && (
        <input
          name="search"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search Person"
        />
      )}
      <table>
        <thead>
          <tr>
            {columnKeys.map((key) => (
              <td key={key}>{key.toUpperCase()}</td>
            ))}
          </tr>
        </thead>
        <tbody>{renderTbody}</tbody>
      </table>
      {paginationProps && <Pagination pagination={paginationProps} />}
    </>
  );
};

export default TableWithFilter;

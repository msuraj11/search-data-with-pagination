import React, { useState, useMemo } from "react";
import { TablePropTypes } from "../shapes";
import Pagination from "./Pagination";

const TableWithFilter: React.FC<TablePropTypes> = ({
  tableData,
  searchWithKey = "",
  columnKeys,
  renderAction = () => {},
  paginationProps,
  skipFilter = false,
  showLoader = false,
  hideTableHeader = false,
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

  return (
    <div className="table-container">
      {!skipFilter && (
        <input
          name="search"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search Person"
        />
      )}
      <table>
        {!hideTableHeader && (
          <thead>
            <tr>
              {columnKeys?.map((key) => (
                <td key={key}>{key.toUpperCase()}</td>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {filteredData?.length > 0
            ? filteredData.map((data) => (
                <tr key={Math.random().toString(16).slice(2)}>
                  {columnKeys?.map((key) => (
                    <td>
                      {showLoader ? (
                        <div className="skeleton skeleton-text" />
                      ) : (
                        data[key] ?? renderAction(data) ?? ""
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : "No Data to show"}
        </tbody>
      </table>
      {paginationProps && <Pagination pagination={paginationProps} />}
    </div>
  );
};

export default TableWithFilter;

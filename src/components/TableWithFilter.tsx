import React, { useState, useMemo } from "react";
import { TablePropTypes } from "../shapes";
import Pagination from "./Pagination";
import Input from "./Input";

const TableWithFilter: React.FC<TablePropTypes> = ({
  tableData,
  searchWithKey = "",
  searchPlaceHolder,
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

  let tableBody: React.ReactElement | React.ReactElement[] = (
    <tr>
      {Array(columnKeys?.length)
        .fill(null)
        .map((_, k) => (
          <td key={Math.pow(k + 1, k + 1)}>
            {showLoader ? (
              <div className="skeleton skeleton-text" />
            ) : (
              columnKeys &&
              k === Math.floor(columnKeys?.length / 2) &&
              "No Data"
            )}
          </td>
        ))}
    </tr>
  );

  if (filteredData?.length > 0) {
    tableBody = filteredData.map((data) => (
      <tr key={Math.random().toString(16).slice(2)}>
        {columnKeys?.map((key) => (
          <td key={key}>
            {showLoader ? (
              <div className="skeleton skeleton-text" />
            ) : (
              data[key] ?? renderAction(data) ?? ""
            )}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <section>
      {!skipFilter && (
        <Input
          name="search"
          value={searchInput}
          onChange={handleInputChange}
          placeholder={searchPlaceHolder}
        />
      )}
      <div className="table-container">
        <table>
          {!hideTableHeader && (
            <thead>
              <tr>
                {columnKeys?.map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>{tableBody}</tbody>
        </table>
      </div>
      {paginationProps && <Pagination pagination={paginationProps} />}
    </section>
  );
};

export default React.memo(TableWithFilter);

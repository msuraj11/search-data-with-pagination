import React, { useEffect, useState, useCallback } from "react";
import TableWithFilter from "./components/TableWithFilter";
import {
  Details,
  DetailsObjectShape,
  Keys,
  ResultData,
  TableRow,
} from "./shapes";
import "./styles.css";
import { API, columnKeys } from "./constants";

export default function App() {
  const [fetchedData, setFetchedData] = useState<ResultData>([]);
  const [showDetails, setShowDetails] = useState<Details>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(goToPage = 1) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}?page=${goToPage}&limit=10`).then((res) =>
        res.json()
      );
      setFetchedData(res?.results);
    } catch (error) {
      console.log(error);
      setFetchedData([]);
    }
    setIsLoading(false);
  }

  async function handleOpenDetails(event: React.BaseSyntheticEvent) {
    const currentUid = event.target.name.split("/").pop();
    if (showDetails && currentUid === showDetails?.uid) {
      setShowDetails(null);
      return;
    }
    let details;
    try {
      details = await fetch(event.target.name)
        .then((res) => res.json())
        .then((data) => data.result);
    } catch (error) {
      console.log(error);
      setShowDetails(null);
    }
    const {
      name = null,
      mass = null,
      gender = null,
      eye_color = null,
      height = null,
    } = details?.properties;
    setShowDetails({ name, mass, gender, eye_color, height, uid: currentUid });
  }

  const handleRenderAction = useCallback(
    function handleRenderAction(row: TableRow) {
      return (
        <button name={row.url} onClick={handleOpenDetails}>
          {showDetails && showDetails.uid === row.uid
            ? "Close"
            : "Show Details"}
        </button>
      );
    },
    [showDetails?.uid]
  );

  function handleNextOrPrevClick(goToPage: number) {
    setIsLoading(true);
    fetchData(goToPage);
  }

  const details: Keys[] | null =
    showDetails && (Object.keys(showDetails) as Keys[]);

  return (
    <div className="container">
      <TableWithFilter
        tableData={fetchedData}
        searchWithKey="name"
        columnKeys={columnKeys}
        renderAction={handleRenderAction}
        paginationProps={{ handleNextOrPrevClick }}
        showLoader={isLoading}
      />
      {showDetails && (
        <table className="details">
          <tbody>
            {details?.map((key: keyof DetailsObjectShape) => (
              <tr>
                <td>{key}</td>
                <td>{showDetails[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

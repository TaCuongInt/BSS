import { useEffect, useState } from "react";

import { SIDEBAR_MODEL } from "../../constants";
import {
  Header,
  Sidebar,
  InputField,
  Button,
  Pagination,
} from "../../components";
import styles from "./Logs.module.scss";

const Logs = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTable1, setDataTable1] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Logs")
      .then((response) => response.json())
      .then((data) => {
        setDataTable(data);
        setDataTable1(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage] = useState(7);

  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = dataTable.slice(indexOfFirstDevice, indexOfLastDevice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchValue == "") {
      alert("Search input is not empty");
    } else {
      setCurrentPage(1);
      setDataTable(
        dataTable.filter(
          (item) => item.Name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar sidebarModel={SIDEBAR_MODEL} />
      </div>
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>
          <div className={styles.heading}>
            <h2>Action Logs</h2>
            <div className={styles.seachArea}>
              <InputField
                placeholder="Name"
                value={searchValue}
                onChange={handleChangeSearchValue}
                type="search"
                onClick={() => {
                  setSearchValue("");
                  setDataTable(dataTable1);
                }}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Name</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentDevices.map((device) => (
                <tr key={device.Device_ID}>
                  <td>{device.Device_ID}</td>
                  <td>{device.Name}</td>
                  <td>{device.Action}</td>
                  <td>{device.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            devicesPerPage={devicesPerPage}
            totalDevices={dataTable.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Logs;

import AnyChart from "anychart-react";
import { useEffect, useState } from "react";

import { SIDEBAR_MODEL } from "../../constants";
import { DevicesTable, Header, Sidebar } from "../../components";
import styles from "./Dashboard.module.scss";
import { AddFormModule } from "../../modules";
import axiosClient from "../../API";

const Dashboard = () => {
  const [dataTable, setDataTable] = useState({
    listDevices: [],
    totalPowerConsumption: 290,
  });
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Dashboard")
      .then((response) => response.json())
      .then((data) => {
        let sum = 0;
        data.forEach((item) => {
          sum += Number(item.Power_Consumption);
          return sum;
        });
        setDataTable({
          listDevices: data,
          totalPowerConsumption: sum,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const _dataChart = [];
    dataTable.listDevices.forEach((item) => {
      const index = _dataChart.findIndex((_item) => {
        return _item.x === item.Devices;
      });

      if (index !== -1) {
        _dataChart[index].value += Number(item.Power_Consumption);
      } else {
        _dataChart.push({
          x: item.Devices,
          value: item.Power_Consumption,
        });
      }
    });
    setDataChart(_dataChart);
  }, [dataTable]);

  const handleAddDevice = (newDevice) => {
    if (
      newDevice.Devices == "" ||
      newDevice.MAC_Address == "" ||
      newDevice.IP == "" ||
      newDevice.Power_Consumption == ""
    ) {
      alert("All fields are compulsory");
    } else {
      const newListDevices = [...dataTable.listDevices, newDevice];
      let sum = 0;
      newListDevices.forEach((item) => {
        sum += Number(item.Power_Consumption);
      });
      const newTotalPowerConsumption = sum;
      setDataTable({
        listDevices: newListDevices,
        totalPowerConsumption: newTotalPowerConsumption,
      });
      axiosClient
        .post("/Dashboard", newDevice)
        .then(() => {
          console.log("Success");
        })
        .catch((err) => console.log(err.response));
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        hidden
        className={styles.nav_input}
        id={styles.nav_input}
      />
      <label for={styles.nav_input} className={styles.nav_overlay}></label>
      <label className={styles.nav_btn} for={styles.nav_input}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          class="svg-inline--fa fa-bars fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          ></path>
        </svg>
      </label>
      <div className={styles.sidebar}>
        <Sidebar sidebarModel={SIDEBAR_MODEL} />
      </div>
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>
          <DevicesTable data={dataTable} />
          <div className={styles.bottom}>
            <div className={styles.chart}>
              <AnyChart
                type="pie"
                innerRadius="50%"
                data={dataChart}
                title="Power Consumption"
                height={400}
              />
            </div>
            <div className={styles.addForm}>
              <AddFormModule
                numberOfDevices={dataTable.listDevices.length}
                onAddDevice={handleAddDevice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import styles from "./DevicesTable.module.scss";

export const DevicesTable = ({ data = {} }) => {
  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>Devices</th>
            <th>MAC Address</th>
            <th>IP</th>
            <th>Created Date</th>
            <th>Power Consumption</th>
          </tr>
        </thead>
        <tbody>
          {data.listDevices.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.Devices}</td>
                <td>{item.MAC_Address}</td>
                <td>{item.IP}</td>
                <td>{item.Created_Date}</td>
                <td>{item.Power_Consumption}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th colSpan="3"></th>
            <th>{data.totalPowerConsumption}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

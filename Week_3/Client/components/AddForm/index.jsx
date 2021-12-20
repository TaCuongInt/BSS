import styles from "./AddForm.module.scss";
import { InputField, Button } from "../../components";

export const AddForm = ({ values = {}, onChangeValues, onAddDevices }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <InputField
          value={values.devices}
          placeholder="Devices"
          name="devices"
          onChange={onChangeValues}
        />
      </div>
      <div className={styles.input}>
        <InputField
          value={values.macAddress}
          placeholder="MAC Address"
          name="macAddress"
          onChange={onChangeValues}
        />
      </div>
      <div className={styles.input}>
        <InputField
          value={values.ip}
          placeholder="IP"
          name="ip"
          onChange={onChangeValues}
        />
      </div>
      <div className={styles.input}>
        <InputField
          value={values.powerConsumption}
          placeholder="Power Consumption"
          name="powerConsumption"
          onChange={onChangeValues}
        />
      </div>
      <Button onClick={onAddDevices}>ADD DEVICE</Button>
    </div>
  );
};

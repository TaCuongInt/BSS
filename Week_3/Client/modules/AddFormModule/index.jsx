import { useState } from "react";

import { AddForm } from "../../components";
import { formatDate } from "../../utilities";

export const AddFormModule = ({
  numberOfDevices = 0,
  onAddDevice = () => {},
}) => {
  const [formValues, setFormValues] = useState({
    devices: "",
    macAddress: "",
    ip: "",
    powerConsumption: "",
  });

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddDevices = () => {
    const newDevice = {
      ID: numberOfDevices + 1,
      Devices: formValues.devices,
      MAC_Address: formValues.macAddress,
      IP: formValues.ip,
      Created_Date: formatDate(new Date()),
      Power_Consumption: formValues.powerConsumption,
    };
    setFormValues({
      devices: "",
      macAddress: "",
      ip: "",
      powerConsumption: "",
    });
    onAddDevice(newDevice);
  };

  return (
    <AddForm
      values={formValues}
      onChangeValues={handleChangeValue}
      onAddDevices={handleAddDevices}
    />
  );
};

import React from "react";
import { useState, useCallback } from "react";
import { Card, Select, Heading, TextField, FormLayout } from "@shopify/polaris";

const GenaralInformation = () => {
  const [nameValue, setNameValue] = useState(" ");
  const [priorityeValue, setPriorityeValue] = useState(0);
  const [statusSelected, setStatusSelected] = useState("enable");

  const optionStatus = [
    { label: "Enable", value: "enable" },
    { label: "Disable", value: "disable" },
  ];

  const handleSelectStatus = useCallback(
    (value) => setStatusSelected(value),
    []
  );
  const handleChangePriority = useCallback(
    (value) => setPriorityeValue(value),
    []
  );
  const handleChangeName = useCallback((value) => setNameValue(value), []);

  return (
    <Card sectioned>
      <FormLayout>
        <Heading>Genaral Information</Heading>
        <TextField
          label="Name"
          onChange={handleChangeName}
          value={nameValue}
          error={nameValue == "" ? "Name is required" : ""}
        />
        <TextField
          label="Priority"
          type="number"
          min="0"
          max="99"
          placeholder="0"
          onChange={handleChangePriority}
          value={priorityeValue}
          helpText="Please enter an interger from 0 to 99.0 is the highest priority"
        />
        <Select
          label="Status"
          options={optionStatus}
          onChange={handleSelectStatus}
          value={statusSelected}
        />
      </FormLayout>
    </Card>
  );
};

export default GenaralInformation;

import {
  Card,
  Heading,
  TextField,
  FormLayout,
  ChoiceList,
} from "@shopify/polaris";
import React from "react";
import { useState, useCallback } from "react";

const CustomPrices = () => {
  const [amountValue, setAmountValue] = useState(0);
  const [pricesChoiced, setPricesChoiced] = useState("0");

  const optionPrices = [
    { label: "Apply a price to selected products", value: "0" },
    {
      label:
        "Decrease a fixed amount of the original prices of selected products",
      value: "1",
    },
    {
      label:
        "Decrease the original prices of selected products by a percentage (%)",
      value: "2",
    },
  ];

  const handleChoicePrices = useCallback(
    (value) => setPricesChoiced(value),
    []
  );
  const handleChangeAmount = useCallback((value) => setAmountValue(value), []);

  return (
    <Card sectioned>
      <FormLayout>
        <Heading>Custom Prices</Heading>
        <ChoiceList
          choices={optionPrices}
          selected={pricesChoiced}
          onChange={handleChoicePrices}
        />
        <TextField
          label="Amount"
          type="number"
          min="0"
          placeholder="0"
          onChange={handleChangeAmount}
          value={amountValue}
        />
      </FormLayout>
    </Card>
  );
};

export default CustomPrices;

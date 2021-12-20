import {
  Card,
  Stack,
  TextStyle,
  ResourceList,
  Autocomplete,
  TextContainer,
} from "@shopify/polaris";
import React from "react";
import { useState, useCallback } from "react";

export const ProductsCollections = () => {
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [inputCollecctionsValue, setInputCollecctionsValue] = useState("");
  const [optionCollections, setOptionCollecctions] = useState([
    { value: "home", label: "Home page" },
    { value: "recommended", label: "Recommended products (Seguno)" },
  ]);

  const updateTextCollecctions = useCallback(
    (value) => {
      setInputCollecctionsValue(value);

      if (value === "") {
        setOptionCollecctions(optionCollections);
        return;
      }

      const filterRegexCollecctions = new RegExp(value, "i");
      const resultOptionCollecctions = optionCollections.filter((option) =>
        option.label.match(filterRegexCollecctions)
      );
      setOptionCollecctions(resultOptionCollecctions);
    },
    [optionCollections]
  );

  const collectionsMarkup = selectedCollections.map((option) => {
    let collecctionsLabel = "";
    collecctionsLabel = option.replace("_", " ");
    collecctionsLabel = titleCase(collecctionsLabel);
    return (
      <Card>
        <ResourceList.Item id={option}>
          <Stack>
            <Stack.Item>
              <h3>
                <TextStyle variation="strong">{collecctionsLabel}</TextStyle>
              </h3>
            </Stack.Item>
          </Stack>
        </ResourceList.Item>
      </Card>
    );
  });

  const textFieldCollections = (
    <Autocomplete.TextField
      onChange={updateTextCollecctions}
      value={inputCollecctionsValue}
      placeholder="Vintage, cotton, summer"
    />
  );

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join("");
  }

  return (
    <div>
      <Autocomplete
        allowMultiple
        options={optionCollections}
        selected={selectedCollections}
        textField={textFieldCollections}
        onSelect={setSelectedCollections}
        listTitle="Suggested collections"
      />
      <br />
      <TextContainer>
        <Stack>{collectionsMarkup}</Stack>
      </TextContainer>
    </div>
  );
};

export default ProductsCollections;

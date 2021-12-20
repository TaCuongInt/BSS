import React from "react";
import { useState, useCallback } from "react";
import { Tag, Stack, Autocomplete, TextContainer } from "@shopify/polaris";

const ProductsTags = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputTagsValue, setInputTagsValue] = useState("");
  const [optionsTags, setOptionsTags] = useState([
    { value: "2016", label: "2016" },
    { value: "accessories", label: "Accessories" },
    { value: "beanies", label: "Beanies" },
    { value: "helmets", label: "Helmets" },
    { value: "jackets", label: "Jackets" },
  ]);

  const updateTextTags = useCallback(
    (value) => {
      setInputTagsValue(value);

      if (value === "") {
        setOptionsTags(optionsTags);
        return;
      }

      const filterRegexTags = new RegExp(value, "i");
      const resultOptionsTags = optionsTags.filter((option) =>
        option.label.match(filterRegexTags)
      );
      setOptionsTags(resultOptionsTags);
    },
    [optionsTags]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const optionsTags = [...selectedTags];
      optionsTags.splice(optionsTags.indexOf(tag), 1);
      setSelectedTags(optionsTags);
    },
    [selectedTags]
  );

  const tagsMarkup = selectedTags.map((option) => {
    let tagLabel = "";
    tagLabel = option.replace("_", " ");
    tagLabel = titleCase(tagLabel);
    return (
      <Tag key={`option${option}`} onRemove={removeTag(option)}>
        {tagLabel}
      </Tag>
    );
  });

  const textFieldTags = (
    <Autocomplete.TextField
      onChange={updateTextTags}
      value={inputTagsValue}
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
      <TextContainer>
        <Stack>{tagsMarkup}</Stack>
      </TextContainer>
      <br />
      <Autocomplete
        allowMultiple
        options={optionsTags}
        selected={selectedTags}
        textField={textFieldTags}
        onSelect={setSelectedTags}
        listTitle="Suggested Tags"
      />
    </div>
  );
};

export default ProductsTags;

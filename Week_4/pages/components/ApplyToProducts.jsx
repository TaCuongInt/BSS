import React from "react";
import { useState, useCallback } from "react";
import ProductsTags from "./common/ProductsTags/ProductsTags";
import SpecialProducts from "./common/SpecialProducts/SpecialProducts";
import ProductsCollections from "./common/ProductsCollections/ProductsCollections";
import { Card, Heading, FormLayout, ChoiceList } from "@shopify/polaris";

const ApplyToProducts = () => {
  const [productsChoiced, setProductsChoiced] = useState(["all_products"]);

  const handleChoiceProducts = useCallback(
    (value) => setProductsChoiced(value),
    []
  );

  const renderChildren = useCallback(
    (isSelected) =>
      isSelected &&
      (productsChoiced[0] === "special_products" ? (
        <SpecialProducts />
      ) : productsChoiced[0] === "products_collections" ? (
        <ProductsCollections />
      ) : (
        <ProductsTags />
      )),
    [productsChoiced]
  );

  return (
    <Card sectioned>
      <FormLayout>
        <Heading>Apply to Products</Heading>
        <ChoiceList
          choices={[
            {
              label: "All Products",
              value: "all_products",
            },
            {
              label: "Special Products",
              value: "special_products",
              renderChildren,
            },
            {
              label: "Products Collections",
              value: "products_collections",
              renderChildren,
            },
            {
              label: "Products Tags",
              value: "products_tags",
              renderChildren,
            },
          ]}
          selected={productsChoiced}
          onChange={handleChoiceProducts}
        />
      </FormLayout>
    </Card>
  );
};

export default ApplyToProducts;

import React from "react";
import { Card, Heading, DataTable } from "@shopify/polaris";

const ProductsPricing = () => {
  const productPricings = [
    ["T-Shirt", "All variant prices - 20%"],
    ["Gift Card", "All variant prices - 20%"],
    ["Stitch", "160.000đ"],
    ["Ayres Chambray", "All variant prices - 20%"],
    ["Derlay Tier Backpack", "All variant prices - 20%"],
    ["Chevron", "All variant prices - 20%"],
    ["% 5 Panel Camp Cap", "All variant prices - 20%"],
  ];

  return (
    <Card sectioned>
      <Heading>Show products pricing details</Heading>
      <DataTable
        columnContentTypes={["text", "text"]}
        headings={["Title", "Modified Price"]}
        rows={productPricings}
      />
    </Card>
  );
};

export default ProductsPricing;

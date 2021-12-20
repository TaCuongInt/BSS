import React from "react";
import store from "store-js";
import { useState, useCallback } from "react";
import { Button } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

import ResourceListSpecialProducts from "./ResourceListSpecialProducts";

const SpecialProducts = () => {
  const [open, setOpen] = useState(false);

  const handleClickSearchProducts = useCallback(() => {
    setOpen(true);
  }, []);
  const handleSelectionSpecialProducts = useCallback((resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    setOpen(false);
    store.set("ids", idsFromResources);
  }, []);

  return (
    <div>
      <br />
      <Button onClick={handleClickSearchProducts} textAlign="left" fullWidth>
        Search product
      </Button>
      <br />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelectionSpecialProducts(resources)}
        onCancel={() => setOpen(false)}
      />
      <ResourceListSpecialProducts />
    </div>
  );
};

export default SpecialProducts;

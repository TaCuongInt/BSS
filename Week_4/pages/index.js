import { Page, Layout } from "@shopify/polaris";

import CustomPrices from "./components/CustomPrices";
import ProductsPricing from "./components/ProductsPricing";
import ApplyToProducts from "./components/ApplyToProducts";
import GenaralInformation from "./components/GenaralInformation";

const Index = () => {
  return (
    <Page title="New Pricing Rule">
      <Layout>
        <Layout.Section>
          <GenaralInformation />
          <ApplyToProducts />
          <CustomPrices />
        </Layout.Section>
        <Layout.Section secondary>
          <ProductsPricing />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;

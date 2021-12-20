import {
  Card,
  Stack,
  TextStyle,
  Thumbnail,
  ResourceList,
} from "@shopify/polaris";
import React from "react";
import store from "store-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ResourceListSpecialProducts = () => {
  const GET_PRODUCTS_BY_ID = gql`
    query getProducts($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          title
          handle
          descriptionHtml
          id
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
        }
      }
    }
  `;

  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get("ids") }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        return (
          <ResourceList
            resourceName={{ singular: "Product", plural: "Products" }}
            items={data.nodes}
            renderItem={(item) => {
              const media = (
                <Thumbnail
                  source={
                    item.images.edges[0]
                      ? item.images.edges[0].node.originalSrc
                      : ""
                  }
                  alt={
                    item.images.edges[0]
                      ? item.images.edges[0].node.altText
                      : ""
                  }
                />
              );
              return (
                <Card>
                  <ResourceList.Item
                    id={item.id}
                    media={media}
                    onClick={() => {
                      store.set("item", item);
                    }}
                  >
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">{item.title}</TextStyle>
                        </h3>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                </Card>
              );
            }}
          />
        );
      }}
    </Query>
  );
};

export default ResourceListSpecialProducts;

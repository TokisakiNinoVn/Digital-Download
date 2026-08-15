import { useMemo, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin, session } = await authenticate.admin(request);

  // 1. Fetch products from Shopify
  const response = await admin.graphql(`
    query {
      products(first: 50) {
        nodes {
          id
          title
          handle
          status
          featuredImage {
            url
            altText
          }
          variants(first: 10) {
            nodes {
              id
              title
              sku
            }
          }
        }
      }
    }
  `);

  const data = await response.json();

  const products = data.data.products.nodes;

  // 2. Find current merchant
  const merchant = await prisma.merchant.findUnique({
    where: {
      shopDomain: session.shop,
    },
  });

  if (!merchant) {
    throw new Response("Merchant not found", {
      status: 404,
    });
  }

  // 3. Find configured products
  const productFiles = await prisma.productFile.findMany({
    where: {
      digitalFile: {
        merchantId: merchant.id,
      },
    },
    select: {
      productId: true,
      variantId: true,
      digitalFileId: true,
    },
  });

  // 4. Product IDs that have been configured
  const configuredProductIds = new Set(
    productFiles.map((item: any) => item.productId)
  );

  // 5. Merge Shopify products with configuration status
  const productsWithConfig = products.map((product: any) => ({
    ...product,
    isConfigured: configuredProductIds.has(product.id),
  }));

  return {
    products: productsWithConfig,
  };
}

export default function DigitalProductPage() {
  const { products } = useLoaderData<typeof loader>();

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product: any) =>
      product.title.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  return (
    <s-page heading="Digital Product">
      <s-section heading="Products">
        <s-stack direction="block" gap="base">
          <s-text-field
            label="Search products"
            value={search}
            onInput={(event: any) => {
              setSearch(event.currentTarget.value);
            }}
            placeholder="Search by product name..."
          />

          {filteredProducts.length === 0 ? (
            <s-box padding="base">
              <s-paragraph>
                <strong>
                  {search ? "No products found" : "No products available"}
                </strong>
              </s-paragraph>

              <s-paragraph color="subdued">
                {search
                  ? "Try another search keyword."
                  : "Create a product in Shopify Admin first."}
              </s-paragraph>
            </s-box>
          ) : (
            <s-table>
              <s-table-header-row>
                <s-table-header>Product</s-table-header>
                <s-table-header>Status</s-table-header>
                <s-table-header>Digital Product</s-table-header>
                <s-table-header>Variants</s-table-header>
                <s-table-header>Action</s-table-header>
              </s-table-header-row>

              <s-table-body>
                {filteredProducts.map((product: any) => (
                  <s-table-row key={product.id}>
                    <s-table-cell>
                      <s-text>{product.title}</s-text>
                    </s-table-cell>

                    <s-table-cell>
                      <s-badge>{product.status}</s-badge>
                    </s-table-cell>

                    <s-table-cell>
                      {product.isConfigured ? (
                        <s-badge tone="success">Configured</s-badge>
                      ) : (
                        <s-badge>Not configured</s-badge>
                      )}
                    </s-table-cell>

                    <s-table-cell>
                      {product.variants.nodes.length}
                    </s-table-cell>

                    <s-table-cell>
                      <s-button
                        variant="primary"
                        href={`/app/digital-products/${product.id}`}
                      >
                        Configure
                      </s-button>
                    </s-table-cell>
                  </s-table-row>
                ))}
              </s-table-body>
            </s-table>
          )}
        </s-stack>
      </s-section>
    </s-page>
  );
}
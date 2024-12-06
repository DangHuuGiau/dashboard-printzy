import SingleProduct from ".";

export const metadata = {
  title: "Edit Product",
  description: "Page description",
};

export default function NewProductsPage({
  params,
}: {
  params: { sku: string };
}) {
  return (
    <>
      <SingleProduct params={params} />
    </>
  );
}

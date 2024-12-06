import SingleCategory from ".";

export const metadata = {
  title: "Edit Category",
  description: "Page description",
};

export default function NewProductsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <SingleCategory params={params} />
    </>
  );
}

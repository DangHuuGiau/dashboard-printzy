import Analytics from "./analytics";

export const metadata = {
  title: "Analytics",
  description: "Page description",
};

export default function AnalyticsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <Analytics />
    </div>
  );
}

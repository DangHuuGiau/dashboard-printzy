'use client';

import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../loading';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Delay of 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header />
        <Suspense fallback={<Loading />}>
          <main className="grow [&>*:first-child]:scroll-mt-16">
            {loading ? <Loading /> : children}
          </main>
        </Suspense>
      </div>
    </div>
  );
}

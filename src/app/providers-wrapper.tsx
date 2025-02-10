'use client';

import Providers from '@/lib/providers';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const hasToken = localStorage.getItem('token') !== null;
  return  <Providers isAuth={hasToken}>{children}</Providers>
}

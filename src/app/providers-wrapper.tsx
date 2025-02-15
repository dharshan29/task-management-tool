'use client';

import { useEffect, useState } from 'react';
import Providers from '@/lib/providers';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(localStorage.getItem('token') !== null);
  }, []);

  return <Providers isAuth={hasToken}>{children}</Providers>;
}

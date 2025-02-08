'use client';

import { usePathname } from 'next/navigation';



export default function ProvidersWrapper({ children, isAuth }: { children: React.ReactNode; isAuth: boolean }) {

  const pathname = usePathname();

  // return  <Providers isAuth={isAuth}>{children}</Providers>
  return children
}

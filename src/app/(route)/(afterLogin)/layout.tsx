import { ReactNode } from 'react';

export default async function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}

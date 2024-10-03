import { ReactNode } from 'react';

export default async function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>애프터 로그인 레이아웃{children}</div>;
}

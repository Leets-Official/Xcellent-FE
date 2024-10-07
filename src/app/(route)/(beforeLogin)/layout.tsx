import { ReactNode } from 'react';

type Props = { children: ReactNode; modal: ReactNode };
export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div>
      before login 레이아웃
      {children}
      {modal}
    </div>
  );
}

import { ReactNode } from 'react';

type Props = { children: ReactNode; modal: ReactNode };
export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

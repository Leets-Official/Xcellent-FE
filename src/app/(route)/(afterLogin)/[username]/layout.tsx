import React from 'react';

export default function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div>{modal}</div>
    </div>
  );
}

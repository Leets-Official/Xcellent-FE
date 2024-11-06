'use client';

import { createContext, useState, ReactNode } from 'react';

type TabContextType = {
  tab: 'post' | 'like';
  setTab: (value: 'post' | 'like') => void;
};

export const TabContext = createContext<TabContextType>({
  tab: 'post',
  setTab: () => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<'post' | 'like'>('post');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

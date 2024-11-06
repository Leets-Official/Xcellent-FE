'use client';

import { createContext, useState, ReactNode } from 'react';

type TabType = 'post' | 'like' | 'followers' | 'following';

type TabContextType = {
  tab: TabType;
  setTab: (value: TabType) => void;
};

export const TabContext = createContext<TabContextType>({
  tab: 'post',
  setTab: () => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<TabType>('post');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

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
  const segment = useSelectedLayoutSegment();
  const [tab, setTab] = useState<TabType>('post');

  useEffect(() => {
    if (segment === 'followers') {
      setTab('followers');
    } else if (segment === 'following') {
      setTab('following');
    } else if (segment === 'like') {
      setTab('like');
    } else {
      setTab('post');
    }
  }, [segment]);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

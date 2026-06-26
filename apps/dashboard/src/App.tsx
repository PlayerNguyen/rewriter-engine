import { DashboardLayout, Sidebar, Text } from '@rewriter/ui';
import { useMemo, useState } from 'react';
import { configureSidebar } from './configs/configureSidebar';

export function App() {
  const [expanded, setExpanded] = useState(true);
  const items = useMemo(() => configureSidebar(), []);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          items={items}
        />
      }
    >
      <Text size="headline">Dashboard</Text>
    </DashboardLayout>
  );
}

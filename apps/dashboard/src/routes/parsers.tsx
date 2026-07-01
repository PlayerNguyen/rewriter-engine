import { type GetApiV1Parsers200Item, getApiV1Parsers } from '@rewriter/rest-client';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/parsers')({
  component: ParsersPage,
});

function ParsersPage() {
  const { t } = useTranslation();
  const [parsers, setParsers] = useState<GetApiV1Parsers200Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApiV1Parsers()
      .then((data) => setParsers(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Stack gap="lg">
      <Text size="headline" weight={600}>
        {t('parsers.title')}
      </Text>
      <Text size="body" className="text-ink-subtle">
        {t('parsers.description')}
      </Text>
      {loading ? (
        <Text size="body">Loading...</Text>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('parsers.key')}</TableHead>
              <TableHead>{t('parsers.name')}</TableHead>
              <TableHead>{t('parsers.urlPatterns')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsers.map((parser) => (
              <TableRow key={parser.key}>
                <TableCell>
                  <code className="text-sm bg-surface-2 px-1.5 py-0.5 rounded">{parser.key}</code>
                </TableCell>
                <TableCell>{parser.name}</TableCell>
                <TableCell>
                  {parser.urlPatterns.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {parser.urlPatterns.map((pattern) => (
                        <code key={pattern} className="text-xs bg-surface-2 px-1.5 py-0.5 rounded">
                          {pattern}
                        </code>
                      ))}
                    </div>
                  ) : (
                    <span className="text-ink-subtle text-xs">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}

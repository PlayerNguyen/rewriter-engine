import { type GetApiV1Parsers200Item, getApiV1Parsers } from '@rewriter/rest-client';
import { Text } from '@rewriter/ui';
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
    <div className="flex flex-col gap-4">
      <Text size="headline" weight={600}>
        {t('parsers.title')}
      </Text>
      <Text size="body" className="text-ink-subtle">
        {t('parsers.description')}
      </Text>
      {loading ? (
        <Text size="body">Loading...</Text>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-hairline">
              <th className="text-left p-2 text-sm font-medium text-ink-subtle">
                {t('parsers.key')}
              </th>
              <th className="text-left p-2 text-sm font-medium text-ink-subtle">
                {t('parsers.name')}
              </th>
              <th className="text-left p-2 text-sm font-medium text-ink-subtle">
                {t('parsers.urlPatterns')}
              </th>
            </tr>
          </thead>
          <tbody>
            {parsers.map((parser) => (
              <tr key={parser.key} className="border-b border-hairline">
                <td className="p-2">
                  <code className="text-sm bg-surface-2 px-1.5 py-0.5 rounded">{parser.key}</code>
                </td>
                <td className="p-2 text-sm">{parser.name}</td>
                <td className="p-2 text-sm">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

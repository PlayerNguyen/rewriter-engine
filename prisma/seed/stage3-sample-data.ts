import type { PrismaClient } from '../../packages/db/src/generated/prisma';
import type { SeedContext } from './context';

export async function seedSampleData(prisma: PrismaClient, ctx: SeedContext) {
  console.log('\n📰 Stage 3: Sample data (sources)');

  const sampleSource = await prisma.source.upsert({
    where: { id: 'sample-source' },
    update: {},
    create: {
      id: 'sample-source',
      name: 'Sample RSS Feed',
      url: 'https://example.com/feed.xml',
      type: 'RSS',
      isActive: false,
    },
  });
  console.log(`   ✅ Sample source: ${sampleSource.name} (inactive)`);
}

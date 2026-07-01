import type { PrismaClient } from '../../packages/db/src/generated/prisma';
import type { SeedContext } from './context';

export async function seedSampleData(prisma: PrismaClient, ctx: SeedContext) {
  console.log('\n📰 Stage 3: Sample data (sources)');

  const sources = [
    {
      id: 'd66d46bd-1f5d-43e8-b780-e13b3498bc5b',
      name: 'Tuổi Trẻ - Trang chủ',
      url: 'https://tuoitre.vn/home.rss',
      type: 'RSS' as const,
    },
    {
      id: 'dcb03cc8-33cf-4262-9ca0-cccc1982ecdd',
      name: 'Tuổi Trẻ - Thời sự',
      url: 'https://tuoitre.vn/thoi-su.rss',
      type: 'RSS' as const,
    },
    {
      id: '39394bcc-f0d3-4266-a704-245fbe9f5fb2',
      name: 'Tuổi Trẻ - Thế giới',
      url: 'https://tuoitre.vn/the-gioi.rss',
      type: 'RSS' as const,
    },
    {
      id: '77e68d74-25dd-4bff-9f77-61b54c62743f',
      name: 'Tuổi Trẻ - Kinh doanh',
      url: 'https://tuoitre.vn/kinh-doanh.rss',
      type: 'RSS' as const,
    },
    {
      id: 'afa9ff28-85bf-40c7-bf7f-7b77d296fdb9',
      name: 'Tuổi Trẻ - Công nghệ',
      url: 'https://tuoitre.vn/nhip-song-so.rss',
      type: 'RSS' as const,
    },
    {
      id: 'c29e8274-007a-4f01-81cb-90b15921a16b',
      name: 'Tuổi Trẻ - Thể thao',
      url: 'https://tuoitre.vn/the-thao.rss',
      type: 'RSS' as const,
    },
    {
      id: 'ac724404-6299-4d50-8326-a5c88f7bbaa5',
      name: 'Tuổi Trẻ - Giải trí',
      url: 'https://tuoitre.vn/giai-tri.rss',
      type: 'RSS' as const,
    },
    {
      id: '42ac4613-59af-4cd1-b59c-1e37f7f650e3',
      name: 'Tuổi Trẻ - Giáo dục',
      url: 'https://tuoitre.vn/giao-duc.rss',
      type: 'RSS' as const,
    },
    {
      id: '74072837-b53e-49d4-ba0c-c913779126e5',
      name: 'Tuổi Trẻ - Sức khỏe',
      url: 'https://tuoitre.vn/suc-khoe.rss',
      type: 'RSS' as const,
    },
    {
      id: 'b77d2055-bf86-4eaf-b92a-d73235b2656d',
      name: 'Tuổi Trẻ - Du lịch',
      url: 'https://tuoitre.vn/du-lich.rss',
      type: 'RSS' as const,
    },
  ];

  for (const source of sources) {
    await prisma.source.upsert({
      where: { id: source.id },
      update: { name: source.name, url: source.url },
      create: source,
    });
    console.log(`   ✅ ${source.name}`);
  }
}

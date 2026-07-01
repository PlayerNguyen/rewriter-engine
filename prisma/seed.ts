import {config} from "dotenv"
config({path: '../.env'})
import { PrismaClient } from '../packages/db/src/generated/prisma';
import { createContext } from './seed/context';
import { seedFoundation } from './seed/stage1-foundation';
import { seedConfig } from './seed/stage2-config';
import { seedSampleData } from './seed/stage3-sample-data';
import { db } from "@rewriter/db";

const prisma = db;

async function main() {
  console.log('🌱 Seeding database...\n');

  const ctx = createContext();

  await seedFoundation(prisma, ctx);
  await seedConfig(prisma, ctx);
  await seedSampleData(prisma, ctx);

  console.log('\n🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

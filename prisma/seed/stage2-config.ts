import type { PrismaClient } from '../../packages/db/src/generated/prisma';
import type { SeedContext } from './context';

export async function seedConfig(prisma: PrismaClient, ctx: SeedContext) {
  console.log('\n⚙️  Stage 2: Config (settings, system prompts)');

  // System prompts
  const prompts = [
    {
      id: 'default-rewrite',
      name: 'Default Rewrite',
      content:
        'You are a professional content rewriter. Rewrite the following article to be engaging, well-structured, and easy to read. Maintain the key facts and meaning while improving clarity and flow.',
      description: 'Default system prompt for article rewriting',
      isDefault: true,
    },
    {
      id: 'summarize',
      name: 'Summarize',
      content:
        'Summarize the following article in 3 concise paragraphs. Focus on the key points and main takeaways.',
      description: 'Short summary mode',
      isDefault: false,
    },
  ];

  for (const p of prompts) {
    const prompt = await prisma.systemPrompt.upsert({
      where: { id: p.id },
      update: { content: p.content, description: p.description, isDefault: p.isDefault },
      create: p,
    });
    console.log(`   ✅ System prompt: ${prompt.name}`);
  }

  // Settings
  const settings = [
    { key: 'llm.provider', value: 'openai' },
    { key: 'llm.model', value: 'gpt-4o-mini' },
    { key: 'explorer.interval_minutes', value: 30 },
    { key: 'rewriter.max_tokens', value: 4096 },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`   ✅ Default settings seeded (${settings.length} entries)`);
}

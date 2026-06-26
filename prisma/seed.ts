import { PrismaClient } from '../packages/db/src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Seeding database...');

	// Default admin user
	const admin = await prisma.user.upsert({
		where: { email: 'admin@rewriter.local' },
		update: {},
		create: {
			email: 'admin@rewriter.local',
			name: 'Admin',
			// password: "admin123" hashed with Bun.password.hash
			password: await Bun.password.hash('admin123'),
		},
	});
	console.log(`✅ Admin user: ${admin.email}`);

	// Default system prompt
	const defaultPrompt = await prisma.systemPrompt.upsert({
		where: { id: 'default-prompt' },
		update: {},
		create: {
			id: 'default-prompt',
			name: 'Default Rewrite',
			content:
				'You are a professional content rewriter. Rewrite the following article to be engaging, well-structured, and easy to read. Maintain the key facts and meaning while improving clarity and flow.',
			description: 'Default system prompt for article rewriting',
			isDefault: true,
		},
	});
	console.log(`✅ Default system prompt: ${defaultPrompt.name}`);

	// Default settings
	const defaultSettings = [
		{ key: 'llm.provider', value: 'openai' },
		{ key: 'llm.model', value: 'gpt-4o-mini' },
		{ key: 'explorer.interval_minutes', value: 30 },
		{ key: 'rewriter.max_tokens', value: 4096 },
	];

	for (const setting of defaultSettings) {
		await prisma.setting.upsert({
			where: { key: setting.key },
			update: {},
			create: setting,
		});
	}
	console.log(`✅ Default settings seeded`);

	// Sample source
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
	console.log(`✅ Sample source: ${sampleSource.name}`);

	console.log('🎉 Seeding complete!');
}

main()
	.catch((e) => {
		console.error('❌ Seed failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

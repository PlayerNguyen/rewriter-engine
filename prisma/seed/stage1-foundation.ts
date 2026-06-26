import type { PrismaClient } from '../../packages/db/src/generated/prisma';
import type { SeedContext } from './context';

export async function seedFoundation(prisma: PrismaClient, ctx: SeedContext) {
  console.log('\n👤 Stage 1: Foundation (users, roles, permissions)');

  // Permissions
  const permissions = [
    { name: 'manage:system', description: { vi: 'Quản lý hệ thống', en: 'Manage system settings' } },
    { name: 'manage:sources', description: { vi: 'Quản lý nguồn tin', en: 'Manage content sources' } },
    { name: 'manage:prompts', description: { vi: 'Quản lý prompt', en: 'Manage system prompts' } },
    { name: 'view:articles', description: { vi: 'Xem bài viết', en: 'View articles' } },
    { name: 'manage:articles', description: { vi: 'Quản lý bài viết', en: 'Manage articles' } },
  ];

  for (const p of permissions) {
    const perm = await prisma.permission.upsert({
      where: { name: p.name },
      update: { description: p.description },
      create: p,
    });
    ctx.permissions[p.name] = perm;
    console.log(`   ✅ Permission: ${p.name}`);
  }

  // Roles
  const roles = [
    {
      name: 'admin',
      description: 'Full system access',
      permissions: Object.keys(ctx.permissions),
    },
    {
      name: 'editor',
      description: 'Can manage sources, prompts, and articles',
      permissions: ['manage:sources', 'manage:prompts', 'view:articles', 'manage:articles'],
    },
    {
      name: 'viewer',
      description: 'Read-only access',
      permissions: ['view:articles'],
    },
  ];

  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { id: r.name },
      update: { description: r.description },
      create: { id: r.name, name: r.name, description: r.description },
    });

    // Assign permissions
    for (const permName of r.permissions) {
      const perm = ctx.permissions[permName];
      if (!perm) continue;
      await prisma.roleHasPermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: perm.id } },
        update: {},
        create: { roleId: role.id, permissionId: perm.id },
      });
    }

    ctx.roles[r.name] = role;
    console.log(`   ✅ Role: ${r.name} (${r.permissions.length} permissions)`);
  }

  // Admin user
  const hashedPassword = await Bun.password.hash('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rewriter.local' },
    update: {},
    create: { email: 'admin@rewriter.local', name: 'Admin', password: hashedPassword },
  });

  await prisma.userHasRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: 'admin' } },
    update: {},
    create: { userId: admin.id, roleId: 'admin' },
  });

  ctx.users['admin'] = admin;
  console.log(`   ✅ Admin user: ${admin.email} (role: admin)`);
}

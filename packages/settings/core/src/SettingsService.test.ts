import { describe, expect, it, mock, beforeEach } from 'bun:test';
import { SettingsService } from './SettingsService';

const mockUpdate = mock();

mock.module('@rewriter/db', () => ({
  db: {
    setting: {
      update: (...args: unknown[]) => mockUpdate(...args),
    },
  },
}));

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    mockUpdate.mockReset();
    service = new SettingsService();
  });

  it('calls db.setting.update with correct args', async () => {
    const record = { id: '1', key: 'llm.provider', value: 'openai', createdAt: new Date(), updatedAt: new Date() };
    mockUpdate.mockResolvedValue(record);

    await service.update('llm.provider', 'openai');

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { key: 'llm.provider' },
      data: { value: 'openai' },
    });
  });

  it('returns the updated record', async () => {
    const record = { id: '1', key: 'theme', value: { dark: true }, createdAt: new Date(), updatedAt: new Date() };
    mockUpdate.mockResolvedValue(record);

    const result = await service.update('theme', { dark: true });

    expect(result).toBe(record);
  });

  it('propagates errors from db', async () => {
    const error = new Error('Record not found');
    mockUpdate.mockRejectedValue(error);

    await expect(service.update('nonexistent', 'value')).rejects.toThrow('Record not found');
  });
});

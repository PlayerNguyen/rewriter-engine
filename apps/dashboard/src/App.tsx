import { Button } from "@rewriter/ui";

export function App() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-semibold text-ink">Rewriter Dashboard</h1>
      <p className="text-ink-muted text-lg">Button component showcase</p>

      <div className="flex flex-col gap-8 w-full max-w-2xl">
        <section className="rounded-lg border border-hairline bg-surface-1 p-6">
          <h2 className="text-button text-ink mb-4 uppercase tracking-wide">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Get started</Button>
            <Button variant="secondary">Sign in</Button>
            <Button variant="tertiary">Read changelog</Button>
            <Button variant="inverse">Try for free</Button>
          </div>
        </section>

        <section className="rounded-lg border border-hairline bg-surface-1 p-6">
          <h2 className="text-button text-ink mb-4 uppercase tracking-wide">Sizes</h2>
          <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="rounded-lg border border-hairline bg-surface-1 p-6">
          <h2 className="text-button text-ink mb-4 uppercase tracking-wide">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
      </div>
    </div>
  );
}

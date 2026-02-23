import { PreferencesPanel } from '@/features/company-preferences';
import { PreviewPanel } from '@/features/output';

export default function PreferencesPage() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.12))] overflow-hidden bg-zinc-50">
      <div className="w-1/2 overflow-y-auto border-r border-zinc-200 bg-white">
        <PreferencesPanel />
      </div>
      <div className="w-1/2 overflow-y-auto bg-zinc-50">
        <PreviewPanel />
      </div>
    </div>
  );
}

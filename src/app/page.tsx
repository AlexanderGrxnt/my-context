import { FormPanel } from '@/features/form';
import { PreviewPanel } from '@/features/output';
import { NewProjectButton } from '@/features/form';

export default function DashboardPage() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.12))] overflow-hidden bg-zinc-50">
      <div className="flex w-1/2 flex-col overflow-hidden border-r border-zinc-200 bg-white">
        <div className="flex shrink-0 items-center justify-end border-b border-zinc-100 px-6 py-3">
          <NewProjectButton />
        </div>
        <div className="flex-1 overflow-y-auto">
          <FormPanel />
        </div>
      </div>
      <div className="w-1/2 overflow-y-auto bg-zinc-50">
        <PreviewPanel />
      </div>
    </div>
  );
}

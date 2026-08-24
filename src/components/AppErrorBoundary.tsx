import React from 'react';
import { RefreshCw, TriangleAlert } from 'lucide-react';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  public state: AppErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#07090e] p-6 text-white">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 p-7 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#A855F7]/40 bg-[#A855F7]/15 text-[#D8B4FE]">
              <TriangleAlert className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-['Outfit'] text-2xl font-extrabold">Não foi possível carregar esta tela</h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">Tente recarregar a página. Seus dados não foram alterados.</p>
            <button onClick={() => window.location.reload()} className="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl border border-[#00E5FF]/35 bg-[#00E5FF]/10 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#00E5FF]/20">
              <RefreshCw className="h-4 w-4 text-[#00E5FF]" /> Recarregar página
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

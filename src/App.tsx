import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { HubSection } from './components/HubSection';
import { ImmersiveFullPage } from './components/ImmersiveFullPage';
import { AppErrorBoundary } from './components/AppErrorBoundary';

export type AppView = 'hero' | 'hub' | 'immersive';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('hero');
  const [targetSection, setTargetSection] = useState<number>(1);

  const handleStartFromHero = () => {
    setCurrentView('hub');
  };

  const handleSelectSectionFromHub = (sectionIndex: number) => {
    setTargetSection(sectionIndex);
    setCurrentView('immersive');
  };

  const handleBackToHub = () => {
    setCurrentView('hub');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  return (
    <AppErrorBoundary>
      <main className="w-full min-h-screen bg-[#0d0e12] select-none">
      {currentView === 'hero' && (
        <HeroSection onContinue={handleStartFromHero} />
      )}

      {currentView === 'hub' && (
        <HubSection
          onSelectSection={handleSelectSectionFromHub}
          onBackToHero={handleBackToHero}
        />
      )}

      {currentView === 'immersive' && (
        <ImmersiveFullPage
          initialSection={targetSection}
          onBackToHub={handleBackToHub}
          onBackToHero={handleBackToHero}
        />
      )}
      </main>
    </AppErrorBoundary>
  );
}

export default App;

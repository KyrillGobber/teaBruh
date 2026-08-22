import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { X, Download, Share } from 'lucide-react';
import { t } from 'i18next';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    // Check if user previously dismissed
    const hasDismissed = localStorage.getItem('install-banner-dismissed');
    if (hasDismissed) {
      setDismissed(true);
    }
    
    // Check if on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);
    
    // Prevent showing if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }
    
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);
  
  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstallPrompt(null);
      setIsInstallable(false);
    } else {
      // User dismissed - remember this
      handleDismiss();
    }
  };
  
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('install-banner-dismissed', 'true');
  };
  
  // Don't show if:
  // 1. User dismissed
  // 2. Not installable (and not iOS)
  // 3. Already in standalone mode
  if (dismissed || (!isInstallable && !isIOS) || window.matchMedia('(display-mode: standalone)').matches) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-lg z-50">
      <div>
        <h3 className="font-bold">
          {t('installBanner.title', 'Add Teabruh to Home Screen')}
        </h3>
        <p className="text-sm">
          {isIOS 
            ? t('installBanner.iosMessage', 'Tap the share button and "Add to Home Screen" for the best experience') 
            : t('installBanner.message', 'Install our app for the best experience and offline use')}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isIOS ? (
          <Button onClick={handleDismiss} variant="secondary" className="gap-2" size="sm">
            <Share size={16} />
            {t('installBanner.iosAction', 'Got it!')}
          </Button>
        ) : (
          <Button onClick={handleInstallClick} variant="secondary" className="gap-2" size="sm">
            <Download size={16} />
            {t('installBanner.install', 'Install')}
          </Button>
        )}
        <Button onClick={handleDismiss} variant="ghost" size="icon">
          <X size={16} />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
}

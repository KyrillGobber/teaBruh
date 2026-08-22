import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import { t } from 'i18next';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    // Check if on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);
    
    // Prevent showing install prompt if already installed
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
    }
  };
  
  if (!isInstallable && !isIOS) return null;
  
  return (
    <Button
      onClick={handleInstallClick}
      variant="outline"
      className="gap-2"
      size="sm"
    >
      <Download size={16} />
      {t('install.button', 'Install')}
    </Button>
  );
}

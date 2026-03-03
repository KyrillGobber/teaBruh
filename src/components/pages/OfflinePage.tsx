import { Coffee } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { t } from 'i18next';

export const OfflinePage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center bg-background">
      <Coffee size={120} />
      <h1 className="text-4xl mt-6 mb-2">{t('offline.title')}</h1>
      <p className="mb-6">{t('offline.message')}</p>
      
      {isOnline ? (
        <Button onClick={() => window.location.reload()}>
          {t('offline.reload')}
        </Button>
      ) : (
        <p className="text-amber-500">{t('offline.waiting')}</p>
      )}
    </div>
  );
};
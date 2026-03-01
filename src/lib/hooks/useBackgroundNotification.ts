/**
 * Thin hook for scheduling/cancelling background tea-done notifications
 * via the service worker. Does not touch any timer logic.
 */

async function getServiceWorker(): Promise<ServiceWorker | null> {
    if (!('serviceWorker' in navigator)) return null;
    const registration = await navigator.serviceWorker.ready;
    return registration.active;
}

async function requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
}

export function useBackgroundNotification() {
    const scheduleNotification = async (
        endTime: number,
        infusionNumber: number,
        teaName: string
    ) => {
        const granted = await requestPermission();
        if (!granted) return;

        const sw = await getServiceWorker();
        if (!sw) return;

        sw.postMessage({
            type: 'SCHEDULE_NOTIFICATION',
            endTime,
            infusionNumber,
            teaName,
        });
    };

    const cancelNotification = async () => {
        const sw = await getServiceWorker();
        if (!sw) return;

        sw.postMessage({ type: 'CANCEL_NOTIFICATION' });
    };

    return { scheduleNotification, cancelNotification };
}

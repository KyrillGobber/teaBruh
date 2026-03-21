import { useCallback } from 'react'

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

export type NotificationAction = 'stop' | 'start' | 'nextInfusion'

export function useBackgroundNotification() {
    const sendToSw = useCallback(async (message: object) => {
        const granted = await requestPermission();
        if (!granted) return;
        const sw = await getServiceWorker();
        if (!sw) return;
        sw.postMessage(message);
    }, []);

    const scheduleNotification = useCallback(
        async (endTime: number, infusionNumber: number, teaName: string) => {
            await sendToSw({
                type: 'SCHEDULE_NOTIFICATION',
                endTime,
                infusionNumber,
                teaName,
            });
        },
        [sendToSw]
    );

    const cancelNotification = useCallback(async () => {
        const sw = await getServiceWorker();
        if (!sw) return;
        sw.postMessage({ type: 'CANCEL_NOTIFICATION' });
    }, []);

    const showRunningNotification = useCallback(
        async (currentTime: number, infusionNumber: number, teaName: string, isPretimer: boolean = false) => {
            await sendToSw({
                type: 'SHOW_RUNNING_NOTIFICATION',
                currentTime,
                infusionNumber,
                teaName,
                pretimer: isPretimer,
            });
        },
        [sendToSw]
    );

    const showPausedNotification = useCallback(
        async (currentTime: number, infusionNumber: number, teaName: string) => {
            await sendToSw({
                type: 'SHOW_PAUSED_NOTIFICATION',
                currentTime,
                infusionNumber,
                teaName,
            });
        },
        [sendToSw]
    );

    const closeTimerNotification = useCallback(async () => {
        await sendToSw({ type: 'CLOSE_TIMER_NOTIFICATION' });
    }, [sendToSw]);

    const onNotificationAction = useCallback((callback: (action: NotificationAction) => void) => {
        if (!('serviceWorker' in navigator)) return () => {};

        const handler = (event: MessageEvent) => {
            const data = event.data;
            if (!data || !data.type || !data.type.startsWith('ACTION_')) return;

            const actionMap: Record<string, NotificationAction> = {
                ACTION_STOP: 'stop',
                ACTION_START: 'start',
                ACTION_NEXT_INFUSION: 'nextInfusion',
            };

            const action = actionMap[data.type];
            if (action) callback(action);
        };

        navigator.serviceWorker.addEventListener('message', handler);
        return () => navigator.serviceWorker.removeEventListener('message', handler);
    }, []);

    return {
        scheduleNotification,
        cancelNotification,
        showRunningNotification,
        showPausedNotification,
        closeTimerNotification,
        onNotificationAction,
    };
}

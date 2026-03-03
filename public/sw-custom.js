/**
 * Custom service worker extension for background tea timer notifications.
 * This file is imported by the Workbox-generated SW via importScripts.
 *
 * Messages handled:
 *   SCHEDULE_NOTIFICATION — schedule a notification at a given end time
 *   CANCEL_NOTIFICATION   — cancel any pending scheduled notification
 */

let notificationTimeoutId = null;

self.addEventListener('message', (event) => {
    if (!event.data || !event.data.type) return;

    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { endTime, infusionNumber, teaName } = event.data;

        // Clear any previously scheduled notification
        if (notificationTimeoutId !== null) {
            clearTimeout(notificationTimeoutId);
            notificationTimeoutId = null;
        }

        const delay = endTime - Date.now();
        if (delay <= 0) return;

        notificationTimeoutId = setTimeout(() => {
            notificationTimeoutId = null;
            self.registration.showNotification(`${teaName} ready!`, {
                body: `Infusion ${infusionNumber} is done. Enjoy!`,
                icon: '/tea-192.png',
                badge: '/tea-144.png',
                tag: 'tea-timer',
                renotify: true,
                requireInteraction: false,
            });
        }, delay);
    }

    if (event.data.type === 'CANCEL_NOTIFICATION') {
        if (notificationTimeoutId !== null) {
            clearTimeout(notificationTimeoutId);
            notificationTimeoutId = null;
        }
    }
});

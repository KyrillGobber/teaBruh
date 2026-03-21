/**
 * Custom service worker extension for background tea timer notifications.
 * This file is imported by the Workbox-generated SW via importScripts.
 *
 * Messages handled:
 *   SHOW_RUNNING_NOTIFICATION  — show/update notification with remaining time + stop action
 *   SHOW_PAUSED_NOTIFICATION   — update notification to show resume action
 *   CLOSE_TIMER_NOTIFICATION   — close the running/paused notification
 *   SCHEDULE_NOTIFICATION      — schedule a done notification at a given end time
 *   CANCEL_NOTIFICATION        — cancel any pending scheduled notification
 */

let notificationTimeoutId = null;

function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function sendToClients(message) {
    self.clients.matchAll({ type: 'window' }).then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage(message);
        });
    });
}

function closeByTag(tag) {
    self.registration.getNotifications({ tag: tag }).then(function (notifications) {
        notifications.forEach(function (notification) { notification.close(); });
    });
}

self.addEventListener('message', function (event) {
    if (!event.data || !event.data.type) return;

    var data = event.data;

    if (data.type === 'SHOW_RUNNING_NOTIFICATION') {
        var body = data.pretimer
            ? 'Pour your water... ' + data.currentTime + 's'
            : data.teaName + ' - Infusion ' + data.infusionNumber + ': ' + formatTime(data.currentTime);

        closeByTag('tea-timer-running');
        self.registration.showNotification(data.pretimer ? 'Get ready...' : 'Brewing', {
            body: body,
            icon: '/tea-192.png',
            badge: '/tea-144.png',
            tag: 'tea-timer-running',
            renotify: true,
            requireInteraction: true,
            actions: [
                { action: 'stop', title: 'Stop' }
            ]
        });
    }

    if (data.type === 'SHOW_PAUSED_NOTIFICATION') {
        var body = data.teaName + ' - Infusion ' + data.infusionNumber + ': ' + formatTime(data.currentTime);

        closeByTag('tea-timer-running');
        self.registration.showNotification('Paused', {
            body: body,
            icon: '/tea-192.png',
            badge: '/tea-144.png',
            tag: 'tea-timer-running',
            renotify: true,
            requireInteraction: true,
            actions: [
                { action: 'start', title: 'Resume' }
            ]
        });
    }

    if (data.type === 'CLOSE_TIMER_NOTIFICATION') {
        closeByTag('tea-timer-running');
    }

    if (data.type === 'SCHEDULE_NOTIFICATION') {
        var endTime = data.endTime;
        var infusionNumber = data.infusionNumber;
        var teaName = data.teaName;

        if (notificationTimeoutId !== null) {
            clearTimeout(notificationTimeoutId);
            notificationTimeoutId = null;
        }

        var delay = endTime - Date.now();
        if (delay <= 0) return;

        notificationTimeoutId = setTimeout(function () {
            notificationTimeoutId = null;
            self.registration.showNotification(teaName + ' ready!', {
                body: 'Infusion ' + infusionNumber + ' is done. Enjoy!',
                icon: '/tea-192.png',
                badge: '/tea-144.png',
                tag: 'tea-timer',
                renotify: true,
                requireInteraction: true,
                actions: [
                    { action: 'next-infusion', title: 'Next Infusion' }
                ]
            });
        }, delay);
    }

    if (data.type === 'CANCEL_NOTIFICATION') {
        if (notificationTimeoutId !== null) {
            clearTimeout(notificationTimeoutId);
            notificationTimeoutId = null;
        }
    }
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    var action = event.action;

    if (action === 'stop') {
        sendToClients({ type: 'ACTION_STOP' });
    } else if (action === 'start') {
        sendToClients({ type: 'ACTION_START' });
    } else if (action === 'next-infusion') {
        sendToClients({ type: 'ACTION_NEXT_INFUSION' });
    }

    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clients) {
        if (clients.length > 0) {
            clients[0].focus();
        } else {
            self.clients.openWindow('/');
        }
    });
});

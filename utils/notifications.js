import { Notifications, Permissions } from 'expo';
import React from 'react';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'


function createNotification () {
    return {
        title: "Don't forget to study!",
        body: "⏰ Your daily reminder",
        ios: {
            sound: true,
        }
    };
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()

                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(10);
                            tomorrow.setMinutes(0);


                            //tomorrow.setTime(tomorrow.getTime() + 1000 * 60);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        });
}
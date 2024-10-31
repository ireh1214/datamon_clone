'use client';

export function setSession(key: string, data: string): void {
    if (typeof window !== 'undefined') {
        try {
            sessionStorage.setItem(key, data);
        } catch (error) {
            console.error(`Set session error: ${error}`);
        }
    }
}

export function getSession(key: string): string | null {
    if (typeof window !== 'undefined') {
        try {
            const storedData = sessionStorage.getItem(key);
            if (storedData) {
                return storedData;
            } else {
                console.warn(`No stored data found for key: ${key}`);
            }
        } catch (error) {
            console.error(`Get session error: ${error}`);
        }
    }
    return null;
}
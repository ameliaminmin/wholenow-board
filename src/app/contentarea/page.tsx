'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ContentArea() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        // 如果用戶未登入，重定向到登入頁面
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null; // 在重定向過程中不顯示任何內容
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        歡迎回來，{user.email}
                    </h1>
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            這是您的個人內容區域，您可以在這裡查看和管理您的內容。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

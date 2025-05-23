'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

export default function Content() {
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
        <div className="flex h-screen bg-white dark:bg-gray-900">
            {/* 側邊欄 */}
            <Sidebar />

            {/* 主要內容區域 */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 頂部導航 */}
                <TopNav />

                {/* 內容區域 */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                            👋 &nbsp; 歡迎回來，{user.displayName || user.email}<br />

                        </h1>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            <p>
                                感謝您體驗 WholeNow Board —— 您的全方位人生導覽板。<br />
                                目前為測試版本，尚未啟用加密機制，<b>請避免輸入敏感資訊</b>。<br />
                                正式版本預計於 2026 年 上線，敬請期待！<br />

                                <br />
                                <br />
                                使用說明：<br />
                                請先至設定區選擇您的生日及希望壽命，<br />
                                接著就可以到各個時間軸探索囉！<br />


                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

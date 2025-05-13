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
        <div className="flex h-screen bg-white">
            {/* 側邊欄 */}
            <Sidebar />

            {/* 主要內容區域 */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 頂部導航 */}
                <TopNav />

                {/* 內容區域 */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            歡迎回來，{user.displayName || user.email}

                            WholeNow Board 正在全力籌備中，
                            目前已可體驗功能，但<b>尚未加密</b>，請避免輸入私密資訊。<br />
                            正式版預計於 2026 年推出，敬請期待！<br />
                            歡迎留言分享想法或建議！感謝您的支持 🍀
                        </h1>
                    </div>
                </main>
            </div>
        </div>
    );
}

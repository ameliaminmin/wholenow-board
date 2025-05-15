'use client';

import Sidebar from '@/app/components/contentarea/Sidebar';
import TopNav from '@/app/components/contentarea/TopNav';

export default function Day90Progress() {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* 側導覽列 */}
            <Sidebar />

            {/* 主內容區 */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 上導覽列 */}
                <TopNav />

                {/* 頁面內容 */}
                <main className="flex-1 overflow-y-auto p-4">
                    {/* 這裡可以添加頁面的具體內容 */}
                </main>
            </div>
        </div>
    );
}
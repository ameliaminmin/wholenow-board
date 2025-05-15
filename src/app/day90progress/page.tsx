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
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                        90天目標：
                    </h1>

                    {/* 90天格子容器 */}
                    <div className="w-full">
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 90 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-[1/0.3] bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center"
                                >
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
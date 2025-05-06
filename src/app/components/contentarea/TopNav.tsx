'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function TopNav() {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="px-2 sm:px-4 lg:px-6">
                <div className="flex h-10 items-center justify-between">
                    {/* 左側頁面標題 */}
                    <div className="flex items-center">
                        <h1 className="text-sm font-normal text-gray-900"></h1>
                    </div>

                    {/* 右側工具列 */}
                    <div className="flex items-center gap-4">
                        {/* 三個點按鈕 */}
                        <button className="p-1.5 text-gray-400 hover:text-gray-500">
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

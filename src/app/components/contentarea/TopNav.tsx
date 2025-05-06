'use client';

import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function TopNav() {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* 搜尋框 */}
                    <div className="flex-1 max-w-lg">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="搜尋..."
                            />
                        </div>
                    </div>

                    {/* 右側工具列 */}
                    <div className="flex items-center gap-4">
                        {/* 通知按鈕 */}
                        <button className="relative p-2 text-gray-400 hover:text-gray-500">
                            <BellIcon className="h-6 w-6" />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                        </button>

                        {/* 用戶頭像 */}
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                            <Image
                                src="/avatar-placeholder.png"
                                alt="用戶頭像"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

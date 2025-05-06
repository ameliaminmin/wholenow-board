'use client';

import { useState } from 'react';
import {
    HomeIcon,
    UserGroupIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// 導航項目類型定義
type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// 導航項目列表
const navigation: NavItem[] = [
    { name: '首頁', href: '/', icon: HomeIcon },
    { name: '團隊', href: '/team', icon: UserGroupIcon },
    { name: '行事曆', href: '/calendar', icon: CalendarIcon },
    { name: '訊息', href: '/messages', icon: ChatBubbleLeftRightIcon },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`bg-white h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
            } border-r border-gray-200`}>
            {/* 收合按鈕 */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full p-4 flex items-center justify-end hover:bg-gray-50"
            >
                {isCollapsed ? (
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                )}
            </button>

            {/* 導航項目 */}
            <nav className="mt-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <item.icon className="h-6 w-6" />
                        {!isCollapsed && (
                            <span className="ml-3">{item.name}</span>
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

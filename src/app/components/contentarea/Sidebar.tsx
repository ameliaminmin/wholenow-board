'use client';

import { useState } from 'react';
import {
    HomeIcon,
    AcademicCapIcon,
    Cog6ToothIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// 導航項目類型定義
type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// 導航項目列表
const navigation: NavItem[] = [
    { name: '首頁', href: '/', icon: HomeIcon },
    { name: '學習進度表', href: '/progress', icon: AcademicCapIcon },
    { name: '設定', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();

    return (
        <div className={`bg-white h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-48'} border-r border-gray-200`}>
            {/* 用戶信息區域 */}
            <div className="flex items-center p-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        <circle cx="12" cy="12" r="12" fill="#9CA3AF" />
                        <path
                            d="M12 13.5C14.0711 13.5 15.75 11.8211 15.75 9.75C15.75 7.67893 14.0711 6 12 6C9.92893 6 8.25 7.67893 8.25 9.75C8.25 11.8211 9.92893 13.5 12 13.5Z"
                            fill="white"
                        />
                        <path
                            d="M12 15C8.13401 15 5 18.134 5 22H19C19 18.134 15.866 15 12 15Z"
                            fill="white"
                        />
                    </svg>
                </div>
                {!isCollapsed && (
                    <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName || user?.email}</p>
                        <p className="text-xs text-gray-500">&apos;s WholeNow Board</p>
                    </div>
                )}
            </div>

            {/* 收合按鈕 */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full p-3 flex items-center justify-end hover:bg-gray-50"
            >
                {isCollapsed ? (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                ) : (
                    <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
                )}
            </button>

            {/* 導航項目 */}
            <nav className="mt-2">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && (
                            <span className="ml-2 text-sm">{item.name}</span>
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

'use client';

import { useState } from 'react';
import {
    HomeIcon,
    AcademicCapIcon,
    Cog6ToothIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// 自定義日曆圖標組件
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
);

// 導航項目類型定義
type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// 導航項目列表
const navigation: NavItem[] = [
    { name: '首頁', href: '/', icon: HomeIcon },
    { name: '人生年曆', href: '/life-calendar', icon: CalendarIcon },
    { name: '學習進度表', href: '/learnprogress', icon: AcademicCapIcon },
    { name: '設定', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/'; // 登出後跳轉到首頁
        } catch (error) {
            console.error('登出時發生錯誤:', error);
        }
    };

    return (
        <div className={`bg-white h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-48'} border-r border-gray-200`}>
            {/* 用戶信息區域 */}
            <div className="flex items-center p-3 relative">
                <div
                    className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
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

                {/* 下拉選單 */}
                {showDropdown && (
                    <div className="absolute left-3 top-12 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                            登出
                        </button>
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

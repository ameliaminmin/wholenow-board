'use client';

import React from 'react';
import TopNav from '../components/contentarea/TopNav';
import Sidebar from '../components/contentarea/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// 週一到週日
const days = ['一', '二', '三', '四', '五', '六', '日'];

// 獲取本週的日期
const getCurrentWeekDates = (year: number, month: number) => {
    const today = new Date(year, month);
    const currentDay = today.getDay();
    const monday = new Date(today);

    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    return days.map((_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return date.getDate();
    });
};

// 獲取某月的所有日期和對應星期
const getMonthDates = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();  // 改名為 todayDate 避免衝突

    const dates = [];
    for (let date = 1; date <= totalDays; date++) {
        const currentDate = new Date(year, month, date);
        const weekDay = currentDate.getDay();
        const adjustedWeekDay = weekDay === 0 ? 6 : weekDay - 1;
        dates.push({
            date,
            weekDay: days[adjustedWeekDay],
            isToday: isCurrentMonth && date === todayDate  // 使用 todayDate
        });
    }
    return dates;
};

export default function LearnProgressPage() {
    const router = useRouter();
    const { user, userProfile } = useAuth();
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
    const [showYearDropdown, setShowYearDropdown] = React.useState(false);
    const [showMonthDropdown, setShowMonthDropdown] = React.useState(false);
    const yearDropdownRef = React.useRef<HTMLDivElement>(null);
    const todayRowRef = React.useRef<HTMLTableRowElement>(null);

    // 生成年份選項（從出生年到期望壽命）
    const yearOptions = React.useMemo(() => {
        if (!userProfile?.birthDate) {
            const currentYear = new Date().getFullYear();
            const years = [];
            // 生成前後 50 年的範圍
            for (let year = currentYear - 50; year <= currentYear + 50; year++) {
                years.push(year);
            }
            return years;
        }

        const birthYear = new Date(userProfile.birthDate).getFullYear();
        const maxYear = birthYear + (userProfile.expectedLifespan || 80);
        const years = [];
        for (let year = birthYear; year <= maxYear; year++) {
            years.push(year);
        }
        return years;
    }, [userProfile]);

    // 生成月份選項
    const monthOptions = React.useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => i);
    }, []);

    // 檢查用戶是否登入
    React.useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    // 當年份下拉選單打開時，滾動到當前年份的位置
    React.useEffect(() => {
        if (showYearDropdown && yearDropdownRef.current) {
            const currentYearElement = yearDropdownRef.current.querySelector(`[data-year="${new Date().getFullYear()}"]`);
            if (currentYearElement) {
                currentYearElement.scrollIntoView({ block: 'center' });
            }
        }
    }, [showYearDropdown]);

    // 當表格渲染完成後，滾動到今天的位置
    React.useEffect(() => {
        const today = new Date();
        if (selectedMonth === today.getMonth() && selectedYear === today.getFullYear() && todayRowRef.current) {
            todayRowRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }, [selectedMonth, selectedYear]);

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />
                <div className="flex-1 overflow-y-auto">
                    <div className="bg-white min-h-screen p-10 font-sans">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative">
                                <span
                                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                                    className="text-2xl font-bold cursor-pointer hover:text-blue-600"
                                >
                                    {selectedYear}
                                </span>
                                {showYearDropdown && (
                                    <div
                                        ref={yearDropdownRef}
                                        className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto z-10"
                                    >
                                        {yearOptions.map(year => {
                                            const isCurrentYear = year === new Date().getFullYear();
                                            return (
                                                <div
                                                    key={year}
                                                    data-year={year}
                                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${isCurrentYear ? 'bg-blue-50' : ''}`}
                                                    onClick={() => {
                                                        setSelectedYear(year);
                                                        setShowYearDropdown(false);
                                                    }}
                                                >
                                                    {year}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="text-2xl font-bold">年</div>
                            <div className="relative">
                                <span
                                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                                    className="text-2xl font-bold cursor-pointer hover:text-blue-600"
                                >
                                    {selectedMonth + 1}
                                </span>
                                {showMonthDropdown && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                                        {monthOptions.map(month => {
                                            const isCurrentMonth = month === new Date().getMonth();
                                            return (
                                                <div
                                                    key={month}
                                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${isCurrentMonth ? 'bg-blue-50' : ''}`}
                                                    onClick={() => {
                                                        setSelectedMonth(month);
                                                        setShowMonthDropdown(false);
                                                    }}
                                                >
                                                    {month + 1}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="text-2xl font-bold">月</div>
                        </div>
                        <table className="w-full border-collapse bg-white">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left w-12 text-sm">星期</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left w-12 text-sm">日期</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left text-sm">目標</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left text-sm">成果</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left w-16 text-sm">時數</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left text-sm">筆記</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left text-sm">關鍵字</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left text-sm">疑問</th>
                                    <th className="border border-gray-200 p-2 font-semibold bg-gray-50 text-left text-sm">點子</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getMonthDates(selectedYear, selectedMonth).map(({ date, weekDay, isToday }) => (
                                    <tr
                                        key={date}
                                        ref={isToday ? todayRowRef : null}
                                        className={`h-12 ${isToday ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="border border-gray-200 p-2 w-12">{weekDay}</td>
                                        <td className={`border border-gray-200 p-2 w-12 ${isToday ? 'font-bold text-blue-600' : ''}`}>
                                            {date}
                                        </td>
                                        <td className="border border-gray-200 p-2"></td>
                                        <td className="border border-gray-200 p-2"></td>
                                        <td className="border border-gray-200 p-2 w-16"></td>
                                        <td className="border border-gray-200 p-2"></td>
                                        <td className="border border-gray-200 p-2"></td>
                                        <td className="border border-gray-200 p-2"></td>
                                        <td className="border border-gray-200 p-2"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

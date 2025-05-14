'use client';

import React from 'react';
import TopNav from '../components/contentarea/TopNav';
import Sidebar from '../components/contentarea/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';

// 定義進度數據的型別
type ProgressField = 'goal' | 'achievement' | 'hours' | 'notes' | 'question';
type ProgressData = Record<string, {
    [K in ProgressField]: string;
}>;

// 動態導入 ReactMarkdown 以避免 SSR 問題
const ReactMarkdown = dynamic(() => import('react-markdown'), {
    ssr: false,
    loading: () => <div>載入中...</div>
});

// 週一到週日
const days = ['一', '二', '三', '四', '五', '六', '日'];

// 獲取本週的日期
const getCurrentWeekDates = (year: number, month: number, weekNumber: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayWeekday = firstDayOfMonth.getDay() || 7; // 將週日(0)轉換為7
    const daysToFirstMonday = (firstDayWeekday - 1);

    // 計算選中週的第一天
    const firstDayOfWeek = new Date(year, month, 1 - daysToFirstMonday + (weekNumber - 1) * 7);

    return days.map((day, index) => {
        const date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + index);
        const isToday = date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear();
        return {
            date: date.getDate(),
            weekDay: days[index],
            isToday,
            month: date.getMonth(),
            year: date.getFullYear()
        };
    });
};

// 獲取當前日期是該月第幾週
const getCurrentWeek = (year: number, month: number, date: number) => {
    const firstDay = new Date(year, month, 1);
    return Math.ceil((date + (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1)) / 7);
};

// 定義代碼組件的型別
type CodeProps = {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
};

// Markdown 編輯器組件
const MarkdownCell = ({
    value,
    onChange,
    onBlur,
    isEditing,
    onToggleEdit
}: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    isEditing: boolean;
    onToggleEdit: () => void;
}) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            // 設置初始高度
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [isEditing]);

    if (isEditing) {
        return (
            <div className="relative h-full">
                <textarea
                    ref={textareaRef}
                    className="w-full h-full bg-transparent border-none focus:outline-none resize-none overflow-hidden p-1 whitespace-pre-wrap absolute inset-0"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                    style={{
                        minHeight: '100%'
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className="prose prose-sm max-w-none p-1 cursor-pointer hover:bg-gray-50 rounded h-full min-h-[2.5rem] relative"
            onClick={onToggleEdit}
        >
            {value ? (
                <div className="[&_p]:whitespace-pre-wrap [&_li]:whitespace-pre-wrap [&_pre]:whitespace-pre-wrap">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // 自定義標題樣式
                            h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
                            // 自定義列表樣式
                            ul: ({ children }) => <ul className="list-disc pl-4 my-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 my-1">{children}</ol>,
                            // 自定義引用樣式
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-gray-300 pl-2 my-1 text-gray-600">
                                    {children}
                                </blockquote>
                            ),
                            // 自定義代碼塊樣式
                            code: ({ inline, className, children, ...props }: CodeProps) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline ? (
                                    <pre className="bg-gray-100 p-2 rounded my-1 overflow-x-auto">
                                        <code className={match ? `language-${match[1]}` : ''} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                ) : (
                                    <code className="bg-gray-100 px-1 rounded" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {value}
                    </ReactMarkdown>
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center p-1 text-gray-400 opacity-0 hover:opacity-100">

                </div>
            )}
        </div>
    );
};

export default function LearnProgressPage() {
    const router = useRouter();
    const { user, userProfile } = useAuth();
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
    const [selectedWeek, setSelectedWeek] = React.useState(getCurrentWeek(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    const [showYearDropdown, setShowYearDropdown] = React.useState(false);
    const [showMonthDropdown, setShowMonthDropdown] = React.useState(false);
    const yearDropdownRef = React.useRef<HTMLDivElement>(null);
    const todayRowRef = React.useRef<HTMLTableRowElement>(null);
    const [progressData, setProgressData] = React.useState<ProgressData>({});
    const [editingCell, setEditingCell] = React.useState<{
        dateKey: string;
        field: ProgressField;
    } | null>(null);

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

    // 加载用户的学习进度数据
    React.useEffect(() => {
        if (user) {
            const loadProgressData = async () => {
                const docRef = doc(db, 'users', user.uid, 'learnprogress', `${selectedYear}-${selectedMonth}-${selectedWeek}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProgressData(docSnap.data());
                }
            };
            loadProgressData();
        }
    }, [user, selectedYear, selectedMonth, selectedWeek]);

    if (!user) {
        return null;
    }

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />
                <div className="flex-1 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-900 min-h-screen p-10 pt-2 font-sans">
                        <div className="flex items-center gap-4 mb-4 sticky top-0 bg-white dark:bg-gray-900 z-10 py-4">
                            <div className="relative">
                                <span
                                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                                    className="text-2xl font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {selectedYear}
                                </span>
                                {showYearDropdown && (
                                    <div
                                        ref={yearDropdownRef}
                                        className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg max-h-48 overflow-y-auto z-10"
                                    >
                                        {yearOptions.map(year => {
                                            const isCurrentYear = year === new Date().getFullYear();
                                            return (
                                                <div
                                                    key={year}
                                                    data-year={year}
                                                    className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${isCurrentYear ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
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
                                    className="text-2xl font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {selectedMonth + 1}
                                </span>
                                {showMonthDropdown && (
                                    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                                        {monthOptions.map(month => {
                                            const isCurrentMonth = month === new Date().getMonth();
                                            return (
                                                <div
                                                    key={month}
                                                    className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${isCurrentMonth ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
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
                            <div className="ml-8 relative flex items-center gap-3">
                                {Array.from({ length: 5 }, (_, i) => i + 1).map(week => (
                                    <div
                                        key={week}
                                        onClick={() => {
                                            setSelectedWeek(week);
                                            // 更新表格顯示的週數
                                            const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
                                            const daysToAdd = (week - 1) * 7;
                                            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd);
                                            setSelectedWeek(week);
                                        }}
                                        className={`w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer transition-all duration-200 ${week === selectedWeek
                                            ? 'bg-blue-500 border-blue-500'
                                            : 'hover:border-blue-400 dark:hover:border-blue-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <table className="w-full border-collapse bg-white dark:bg-gray-900">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left w-12 text-sm">星期</th>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left w-12 text-sm">日期</th>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left w-[10%] text-sm">目標</th>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left w-[12%] text-sm">成果</th>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left w-[8%] text-sm">時數</th>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left flex-[2] text-sm">筆記</th>
                                    <th className="border border-gray-200 dark:border-gray-700 p-2 font-semibold bg-gray-50 dark:bg-gray-800 text-left flex-[1.5] text-sm">疑問</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getCurrentWeekDates(selectedYear, selectedMonth, selectedWeek).map(({ date, weekDay, isToday, month, year }) => {
                                    const dateKey = `${year}-${month}-${date}`;
                                    const fields: ProgressField[] = ['goal', 'achievement', 'hours', 'notes', 'question'];
                                    return (
                                        <tr
                                            key={date}
                                            ref={isToday ? todayRowRef : null}
                                            className={`${isToday ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                                        >
                                            <td className="border border-gray-200 dark:border-gray-700 p-2 w-12 text-sm">{weekDay}</td>
                                            <td className={`border border-gray-200 dark:border-gray-700 p-2 w-12 text-sm ${isToday ? 'font-bold text-blue-600 dark:text-blue-300' : ''}`}>
                                                {month !== selectedMonth ? `${month + 1}/${date}` : date}
                                            </td>
                                            {fields.map((field) => (
                                                <td key={field} className="border border-gray-200 dark:border-gray-700 p-0 text-sm h-14 bg-white dark:bg-gray-900">
                                                    <MarkdownCell
                                                        value={progressData[dateKey]?.[field] || ''}
                                                        onChange={(newValue) => {
                                                            const newData = {
                                                                ...progressData,
                                                                [dateKey]: {
                                                                    ...(progressData[dateKey] || {}),
                                                                    [field]: newValue
                                                                }
                                                            };
                                                            setProgressData(newData);
                                                            setDoc(doc(db, 'users', user.uid, 'learnprogress', `${selectedYear}-${selectedMonth}-${selectedWeek}`), newData);
                                                        }}
                                                        isEditing={editingCell?.dateKey === dateKey && editingCell?.field === field}
                                                        onToggleEdit={() => {
                                                            setEditingCell(editingCell?.dateKey === dateKey && editingCell?.field === field
                                                                ? null
                                                                : { dateKey, field });
                                                        }}
                                                        onBlur={() => {
                                                            // 可以添加額外的保存邏輯
                                                        }}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Sidebar from '@/app/components/contentarea/Sidebar';
import TopNav from '@/app/components/contentarea/TopNav';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function LifeCalendar() {
    const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
    const [currentAge, setCurrentAge] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState<string>('');
    const [cellContents, setCellContents] = useState<Record<number, string>>({});
    const [editingCell, setEditingCell] = useState<number | null>(null);
    const [editContent, setEditContent] = useState('');

    // 計算年齡的函數
    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        // 確保年齡至少為1歲
        return Math.max(1, age);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.expectedLifespan) {
                            setLifeExpectancy(userData.expectedLifespan);
                        }
                        if (userData.birthDate) {
                            const age = calculateAge(userData.birthDate);
                            setCurrentAge(age);
                        }
                        if (userData.displayName) {
                            setUserName(userData.displayName);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // 載入格子內容
    useEffect(() => {
        const loadCellContents = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const cellsDoc = await getDoc(doc(db, 'users', user.uid, 'lifecalendar', 'cells'));
                    if (cellsDoc.exists()) {
                        setCellContents(cellsDoc.data() as Record<number, string>);
                    }
                }
            } catch (error) {
                console.error('載入格子內容時發生錯誤：', error);
            }
        };

        loadCellContents();
    }, []);

    // 保存格子內容
    const saveCellContent = async (year: number, content: string) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const newContents = { ...cellContents, [year]: content };
                await setDoc(doc(db, 'users', user.uid, 'lifecalendar', 'cells'), newContents);
                setCellContents(newContents);
            }
        } catch (error) {
            console.error('保存格子內容時發生錯誤：', error);
        }
    };

    // 處理編輯開始
    const handleEditStart = (year: number) => {
        setEditingCell(year);
        setEditContent(cellContents[year] || '');
    };

    // 處理編輯結束
    const handleEditEnd = async () => {
        if (editingCell !== null) {
            await saveCellContent(editingCell, editContent);
            setEditingCell(null);
        }
    };

    // 計算總行數（每行10年）
    const totalRows = Math.ceil(lifeExpectancy / 10);

    // 生成格子
    const generateGrid = () => {
        const grid = [];
        for (let row = 0; row < totalRows; row++) {
            const rowStart = row * 10 + 1;
            const rowEnd = Math.min((row + 1) * 10 + 1, lifeExpectancy + 1);
            const cells = [];

            for (let year = rowStart; year < rowEnd; year++) {
                const isPast = year < currentAge;
                const isCurrent = year === currentAge;
                const isEditing = editingCell === year;
                const content = cellContents[year] || '';

                cells.push(
                    <div
                        key={year}
                        className={`
                            relative group 
                            w-full
                            min-h-[38px] h-auto
                            transition-all duration-300
                            ${isPast ? 'bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 text-gray-900 dark:text-yellow-100' :
                                isCurrent ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 text-gray-900 dark:text-blue-100' :
                                    'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400'}
                            ${isEditing ? 'ring-2 ring-blue-500' : ''}
                            hover:shadow-sm
                            rounded-sm
                            overflow-hidden
                        `}
                        title={`${year}歲`}
                        onClick={() => !isEditing && handleEditStart(year)}
                    >
                        <div className={`absolute top-0 left-0 text-[8px] px-1 bg-white/50 dark:bg-gray-900/60 rounded-br-sm z-10
                            ${isPast ? 'text-yellow-700 dark:text-yellow-200' :
                                isCurrent ? 'text-blue-700 dark:text-blue-200' :
                                    'text-gray-500 dark:text-gray-500'}
                        `}>
                            {year}
                        </div>
                        {isEditing ? (
                            <textarea
                                className="w-full h-full p-1.5 text-xs resize-none focus:outline-none pt-4 bg-transparent dark:bg-gray-900"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                onBlur={handleEditEnd}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.metaKey) {
                                        handleEditEnd();
                                    }
                                }}
                                autoFocus
                                style={{ minHeight: '60px' }}
                            />
                        ) : (
                            <div className="w-full h-full p-1.5 overflow-auto pt-4">
                                <div className="text-xs prose prose-sm max-w-none break-words text-gray-900 dark:text-gray-100">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

            grid.push(
                <div
                    key={row}
                    className="grid grid-cols-10 gap-1 mb-1"
                >
                    {cells}
                </div>
            );
        }
        return grid;
    };

    if (isLoading) {
        return (
            <div className="flex h-screen bg-white dark:bg-gray-900">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <TopNav />
                    <div className="flex-1 p-8 flex items-center justify-center">
                        <div className="text-gray-600 dark:text-gray-300">載入中...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopNav />
                <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
                    <div className="w-full max-w-[1600px] mx-auto">
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            {userName}，你現在 {currentAge} 歲
                        </div>
                        <div className="space-y-2">
                            {generateGrid()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

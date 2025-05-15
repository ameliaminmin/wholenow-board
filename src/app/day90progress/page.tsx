'use client';

import Sidebar from '@/app/components/contentarea/Sidebar';
import TopNav from '@/app/components/contentarea/TopNav';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/contexts/AuthContext';

export default function Day90Progress() {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [editingDay, setEditingDay] = useState<number | null>(null);
    const [goal, setGoal] = useState('');
    const [remark, setRemark] = useState(''); // 新增備註狀態

    // 加载用户保存的数据
    useEffect(() => {
        const loadUserData = async () => {
            if (user) {
                // 加载开始日期
                const dateDoc = await getDoc(doc(db, 'users', user.uid, '90day-progress', 'settings'));
                if (dateDoc.exists()) {
                    const data = dateDoc.data();
                    if (data.startDate) {
                        setStartDate(data.startDate.toDate());
                    }
                }

                // 加载目标
                const goalDoc = await getDoc(doc(db, 'users', user.uid, '90day-progress', 'goal'));
                if (goalDoc.exists()) {
                    setGoal(goalDoc.data().text || '');
                }

                // 加载笔记
                for (let i = 1; i <= 91; i++) {  // 将90改为91以包含第91天
                    const noteDoc = await getDoc(doc(db, 'users', user.uid, '90day-progress', `day-${i}`));
                    if (noteDoc.exists()) {
                        setNotes(prev => ({ ...prev, [i]: noteDoc.data().content || '' }));
                    }
                }

                // 加载備註
                const remarkDoc = await getDoc(doc(db, 'users', user.uid, '90day-progress', 'remark'));
                if (remarkDoc.exists()) {
                    setRemark(remarkDoc.data().text || '');
                }
            }
        };
        loadUserData();
    }, [user]);

    const getDayDate = (dayIndex: number) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + dayIndex);
        return date.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
    };

    const handleNoteChange = async (day: number, content: string) => {
        setNotes(prev => ({ ...prev, [day]: content }));
        if (user) {
            const noteDate = new Date(startDate);
            noteDate.setDate(noteDate.getDate() + day - 1);

            await setDoc(doc(db, 'users', user.uid, '90day-progress', `day-${day}`), {
                content,
                date: noteDate,  // 添加日期字段
                updatedAt: new Date()
            });
        }
    };

    const handleGoalChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGoal = e.target.value;
        setGoal(newGoal);
        if (user) {
            await setDoc(doc(db, 'users', user.uid, '90day-progress', 'goal'), {
                text: newGoal,
                updatedAt: new Date()
            });
        }
    };

    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setStartDate(newDate);
        if (user) {
            await setDoc(doc(db, 'users', user.uid, '90day-progress', 'settings'), {
                startDate: newDate,
                updatedAt: new Date()
            });
        }
    };

    const handleRemarkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRemark = e.target.value;
        setRemark(newRemark);
        if (user) {
            await setDoc(doc(db, 'users', user.uid, '90day-progress', 'remark'), {
                text: newRemark,
                updatedAt: new Date()
            });
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* 側導覽列 */}
            <Sidebar />

            {/* 主內容區 */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 移除上導覽列 */}
                {/* <TopNav /> */}

                {/* 頁面內容 */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                            <h1 className="text-m font-bold text-gray-800 dark:text-gray-200">
                                90天目標：
                            </h1>
                            <input
                                type="text"
                                value={goal}
                                onChange={handleGoalChange}
                                placeholder="輸入目標..."
                                className="text-m font-bold px-3 py-1 w-90 text-gray-800 dark:text-gray-200  "
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={remark}
                                onChange={handleRemarkChange}
                                placeholder="備註..."
                                className="text-sm border rounded px-2 py-1 text-gray-400 dark:text-gray-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">開始日期:</span>
                            <input
                                type="date"
                                value={startDate.toISOString().split('T')[0]}
                                onChange={handleDateChange}
                                className="text-sm border rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    {/* 90天格子容器 */}
                    <div className="w-full">
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 91 }).map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setEditingDay(index + 1)}
                                    className={`aspect-[1/0.2] rounded shadow-sm border ${editingDay === index + 1
                                        ? 'border-blue-500 dark:border-blue-400'
                                        : 'border-gray-200 dark:border-gray-700'
                                        } relative p-1 ${index === 90
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                                            : new Date(startDate).getTime() + (index * 86400000) < Date.now()
                                                ? 'bg-blue-100 dark:bg-blue-900/30'
                                                : 'bg-white dark:bg-gray-800'} ${(index + 1) % 28 === 0 ? 'mb-4' : ''}`}
                                >
                                    {index === 90 ? (
                                        <div className="w-full h-full flex items-center justify-center text-center p-2">
                                            {editingDay === 91 ? (  // 明确使用91
                                                <textarea
                                                    autoFocus
                                                    value={notes[91] || ''}
                                                    onChange={(e) => handleNoteChange(91, e.target.value)}
                                                    onBlur={() => setEditingDay(null)}
                                                    className="w-full h-full p-1 text-sm bg-transparent resize-none outline-none"
                                                    style={{ lineHeight: '1.2', whiteSpace: 'pre-wrap' }}
                                                />
                                            ) : (
                                                <span 
                                                    className="font-bold text-sm cursor-pointer"
                                                    onClick={() => setEditingDay(91)}  // 明确使用91
                                                >
                                                    {notes[91] || '恭喜達成!'}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute top-1 left-1 z-10">
                                                <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                                    {index + 1}
                                                </div>
                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 -mb-1">
                                                    {getDayDate(index)}
                                                </div>
                                            </div>

                                            {editingDay === index + 1 ? (
                                                <textarea
                                                    autoFocus
                                                    value={notes[index + 1] || ''}
                                                    onChange={(e) => handleNoteChange(index + 1, e.target.value)}
                                                    onBlur={() => setEditingDay(null)}
                                                    className="w-full h-full p-1 text-sm bg-transparent resize-none outline-none pl-8 pt-1"
                                                    style={{ lineHeight: '1.2', whiteSpace: 'pre-wrap' }}
                                                />
                                            ) : (
                                                <div className="w-full h-full p-1 overflow-hidden prose dark:prose-invert max-w-none pl-8 pt-1 text-sm">
                                                    <ReactMarkdown components={{
                                                        p: ({ ...props }) => <div {...props} />,
                                                        br: ({ ...props }) => <br {...props} />
                                                    }}>
                                                        {notes[index + 1]?.replace(/\n/g, '  \n') || ''}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
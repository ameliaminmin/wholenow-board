'use client';

import Sidebar from '@/app/components/contentarea/Sidebar';
import TopNav from '@/app/components/contentarea/TopNav';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function Day90Progress() {
    const [startDate, setStartDate] = useState(new Date());
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [editingDay, setEditingDay] = useState<number | null>(null);

    const getDayDate = (dayIndex: number) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + dayIndex);
        return date.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
    };

    const handleNoteChange = async (day: number, content: string) => {
        setNotes(prev => ({ ...prev, [day]: content }));

        await setDoc(doc(db, '90day-progress', `day-${day}`), {
            content,
            updatedAt: new Date()
        });
    };

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
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-start gap-4">
                            <h1 className="text-m font-bold text-gray-800 dark:text-gray-200 mt-1">
                                90天目標：
                            </h1>
                            <input
                                type="text"
                                placeholder="輸入目標..."
                                className="text-2xl font-bold px-3 py-1 w-80 bg-gradient-to-r from-blue-700 via-blue-600  to-blue-500 text-transparent bg-clip-text"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">開始日期:</span>
                            <input
                                type="date"
                                value={startDate.toISOString().split('T')[0]}
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                className="text-sm border rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    {/* 90天格子容器 */}
                    <div className="w-full">
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 90 }).map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setEditingDay(index + 1)}
                                    className={`aspect-[1/0.35] rounded shadow-sm border ${editingDay === index + 1
                                        ? 'border-blue-500 dark:border-blue-400'
                                        : 'border-gray-200 dark:border-gray-700'
                                        } relative p-1 ${new Date(startDate).getTime() + (index * 86400000) < Date.now()
                                            ? 'bg-blue-100 dark:bg-blue-900/30'
                                            : 'bg-white dark:bg-gray-800'}`}
                                >
                                    <div className="absolute top-1 left-1 z-10">
                                        <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                            {index + 1}
                                        </div>
                                        <div className="text-[10px] text-gray-400 dark:text-gray-500 -mb-1">
                                            {getDayDate(index)}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="h-3.8 w-3.8 rounded border-gray-300 text-blue-600 focus:ring-blue-500 -mt-2"
                                        />
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
                                                p: ({ node, ...props }) => <div {...props} />,
                                                br: ({ node, ...props }) => <br {...props} />
                                            }}>
                                                {notes[index + 1]?.replace(/\n/g, '  \n') || ''}
                                            </ReactMarkdown>
                                        </div>
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
'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
    const [view, setView] = useState('dayGridMonth');

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            {/* 視圖切換按鈕 */}
            <div className="mb-4 flex space-x-2">
                <button
                    onClick={() => setView('dayGridMonth')}
                    className={`px-4 py-2 rounded-md ${view === 'dayGridMonth'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    月
                </button>
                <button
                    onClick={() => setView('timeGridWeek')}
                    className={`px-4 py-2 rounded-md ${view === 'timeGridWeek'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    週
                </button>
                <button
                    onClick={() => setView('timeGridDay')}
                    className={`px-4 py-2 rounded-md ${view === 'timeGridDay'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    日
                </button>
            </div>

            {/* 行事曆 */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={view}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
                locale="zh-tw"
                height="auto"
                events={[
                    // 這裡可以添加事件數據
                ]}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                nowIndicator={true}
                eventClick={(info) => {
                    // 處理事件點擊
                    console.log('Event clicked:', info.event.title);
                }}
                select={(info) => {
                    // 處理日期選擇
                    console.log('Date selected:', info.startStr, 'to', info.endStr);
                }}
            />
        </div>
    );
} 
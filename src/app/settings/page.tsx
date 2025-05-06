'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import TopNav from '../components/contentarea/TopNav';
import Sidebar from '../components/contentarea/Sidebar';

export default function SettingsPage() {
    const { user, userProfile, updateUserProfile } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        displayName: '',
        birthDate: '',
        expectedLifespan: 80
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // 計算用戶年齡
    const calculateAge = (birthDate: string) => {
        if (!birthDate) return 0;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // 當用戶資料載入時，更新表單數據
    useEffect(() => {
        if (userProfile) {
            setFormData({
                displayName: userProfile.displayName || user?.displayName || '',
                birthDate: userProfile.birthDate || '',
                expectedLifespan: userProfile.expectedLifespan || 80
            });
        } else if (user) {
            setFormData(prev => ({
                ...prev,
                displayName: user.displayName || ''
            }));
        }
    }, [userProfile, user]);

    // 如果用戶未登入，重定向到登入頁面
    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await updateUserProfile(formData);
            alert('設定已更新！');
        } catch (error) {
            console.error('更新設定時發生錯誤：', error);
            setError('更新設定時發生錯誤，請稍後再試。');
        } finally {
            setIsLoading(false);
        }
    };

    // 計算最小期望壽命（當前年齡）
    const currentAge = calculateAge(formData.birthDate);
    const minLifespan = Math.max(currentAge, 1);

    if (!user) {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* 側邊欄 */}
            <Sidebar />

            {/* 主要內容區域 */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 頂部導航 */}
                <TopNav />

                {/* 設定內容區域 */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-2xl font-semibold mb-6">個人設定</h1>

                        {error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 用戶名稱設定 */}
                            <div className="space-y-2">
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                    用戶名稱
                                </label>
                                <input
                                    type="text"
                                    id="displayName"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="請輸入您的用戶名稱"
                                />
                            </div>

                            {/* 出生年月日設定 */}
                            <div className="space-y-2">
                                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                    出生年月日
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* 期望壽命設定 */}
                            <div className="space-y-2">
                                <label htmlFor="expectedLifespan" className="block text-sm font-medium text-gray-700">
                                    期望壽命（年）
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        id="expectedLifespan"
                                        value={formData.expectedLifespan}
                                        onChange={(e) => setFormData({ ...formData, expectedLifespan: parseInt(e.target.value) })}
                                        min={minLifespan}
                                        max="150"
                                        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {formData.birthDate && (
                                        <span className="text-sm text-gray-500">
                                            （最小：{minLifespan}歲）
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 提交按鈕 */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full max-w-md bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? '儲存中...' : '儲存設定'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

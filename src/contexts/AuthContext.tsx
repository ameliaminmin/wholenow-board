'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// 擴展用戶資料類型
interface UserProfile {
    displayName: string;
    birthDate: string;
    expectedLifespan: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUserProfile: (profile: UserProfile) => Promise<void>;
    userProfile: UserProfile | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    // 從 Firestore 獲取用戶資料
    const fetchUserProfile = async (uid: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                setUserProfile(userDoc.data() as UserProfile);
            }
        } catch (error) {
            console.error('獲取用戶資料時發生錯誤：', error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                setUser(user);
                if (user) {
                    await fetchUserProfile(user.uid);
                } else {
                    setUserProfile(null);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            await fetchUserProfile(userCredential.user.uid);
        } catch (error) {
            console.error('登入錯誤:', error);
            throw error;
        }
    };

    const signUp = async (email: string, password: string, username: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            });
            setUser(userCredential.user);

            // 創建用戶資料，使用註冊時輸入的用戶名稱
            const userProfile: UserProfile = {
                displayName: username, // 使用註冊時輸入的用戶名稱
                birthDate: '',
                expectedLifespan: 80
            };
            await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
            setUserProfile(userProfile);
        } catch (error) {
            console.error('註冊錯誤:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserProfile(null);
        } catch (error) {
            console.error('登出錯誤:', error);
            throw error;
        }
    };

    const updateUserProfile = async (profile: UserProfile) => {
        if (!user) throw new Error('用戶未登入');

        try {
            await setDoc(doc(db, 'users', user.uid), profile);
            setUserProfile(profile);
            await updateProfile(user, {
                displayName: profile.displayName
            });
        } catch (error) {
            console.error('更新用戶資料時發生錯誤：', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signIn,
        signUp,
        logout,
        updateUserProfile,
        userProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 
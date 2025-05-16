'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/contentarea');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 導航欄 */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-medium flex items-center gap-2">
                WholeNow Board
                {/* pre-alpha 標籤，蘋果風格設計 */}
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full border border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300" style={{ letterSpacing: '0.05em' }}>Pre-Alpha </span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                登入
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                註冊
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 區域 */}
      <section className="relative min-h-[600px] flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-gray-900">
        {/* 背景圖片 */}
        <Image
          src="/images/wholenowboard05.JPG"
          alt="WholeNow Board 主視覺"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="z-0"
          priority
        />
        {/* 遮罩 - 調整透明度使文字更清晰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        {/* 文字內容 */}
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <h1 className="text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg dark:text-gray-100">
              WholeNow Board
            </h1>
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full border border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300" style={{ letterSpacing: '0.05em' }}>Pre-Alpha</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-medium text-white mb-12 drop-shadow max-w-2xl mx-auto dark:text-gray-200"
          >
            活出你想成為的版本，<br />從看見全貌開始。
          </motion.p>
          {/* 新增：開發進度說明，低調蘋果風格設計 */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 flex justify-center"
          >
            <span
              className="inline-block px-4 py-2 rounded-lg bg-transparent text-gray-400 text-sm font-normal border border-gray-100 dark:border-gray-700"
              style={{ letterSpacing: '0.01em' }}
            >
              開發者全力籌備中
              <span className="animate-pulse inline-block align-middle mx-1">🔥</span>
              功能持續每日更新，歡迎體驗最新版本，與我們一同見證產品的成長與演進。
            </span>
          </motion.div> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              href="/register"
              className="px-10 py-5 text-lg font-medium bg-white text-gray-900 rounded-full hover:bg-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              體驗測試版
            </Link>
            <a
              href="#features"
              className="px-10 py-5 text-lg font-medium text-white border-2 border-white/80 rounded-full hover:bg-white/10 dark:border-gray-200 dark:text-gray-100 dark:hover:bg-gray-800 transition-all hover:border-white cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              了解更多
            </a>
          </motion.div>
        </div>
      </section>

      {/* 產品描述過渡區域 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 text-center leading-relaxed"
          >
            這是一款結合 <span className="font-medium text-gray-900 dark:text-gray-300">視覺化時間軸</span> × <span className="font-medium text-gray-900 dark:text-gray-300">個人Wiki</span> × <span className="font-medium text-gray-900 dark:text-gray-300">夢想板</span> 的全方位行事曆筆記系統，
            <br />
            幫助你整理人生、釐清方向、紀錄成長。
          </motion.p>
        </div>
      </section>

      {/* 目標用戶區域 */}
      <section className="py-24 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-12 text-center">
            👥 給誰使用？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "想活得更清楚，對自己有探索慾的人",
              "不只是追求效率，更在意「為什麼做這些事」的人",
              "有夢想，但想把它具體化、系統化的人",
              "經歷變化期，希望釐清人生方向的人",
              "喜歡寫日記、做筆記，想升級自己工具的人"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心價值區域 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-6">
              它不只是安排日子，而是在幫助你看見：
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8 text-lg text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔸</span>
                <span>你是誰</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔸</span>
                <span>你走過什麼</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔸</span>
                <span>你正在成為什麼樣的人</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 核心功能區域 */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-16 text-center">
            🌟 核心功能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "🕰️",
                title: "人生時間軸",
                description: "多種時間軸類型，讓你從「人生的全貌」到「當下的重點」都能一眼掌握。支援依據專案與主題分類的專屬時間視圖，讓你的成長、計畫與內在變化，都在對的位置上被看見。"
              },
              {
                icon: "🧠",
                title: "個人Wiki系統",
                description: "建立屬於你自己的主題知識庫：成長背景、價值觀、人生信念、情緒模式、關係模式、夢想、與生命覺察......與AI一起探索，讓你成為自己人生的研究者，為未來做出最好的選擇。"
              },
              {
                icon: "🫀",
                title: "全方位健康管理系統",
                description: "從飲食、運動、睡眠、情緒等整體角度記錄身心健康數值，由AI 幫你分析追蹤現在的運動計畫和成效、推薦適合的營養品等等"
              },
              {
                icon: "🌈",
                title: "夢想板",
                description: "以視覺化的夢想板規劃中長期願景，並對齊短期的任務，將抽象的夢想轉化為可實踐的路徑。"
              },
              {
                icon: "💡",
                title: "自我探索工具",
                description: "內建心理學與自我成長工具（例如：情緒日記、價值觀排序、人生願景引導），讓你在寫筆記的過程中不斷認識自己。"
              },
              {
                icon: "🌿",
                title: "成長紀錄與回顧",
                description: "每週、每月、每年的回顧模板，透過AI自動幫你追蹤心境與價值觀的變化，打造一份屬於自己的「成長年表」。"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 信念區域 */}
      <section className="py-24 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-8"
          >
            我們相信
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
          >
            「不是要做更多事，而是要做對的事。
            <br />
            不是要掌控人生，而是與它同頻共舞。」
          </motion.p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            WholeNow Board 是一面鏡子，也是一張藍圖。
            <br />
            是人生的儀式感，也是日常的管理術。
            <br />
            陪你整合、選擇、記錄，讓每一瞬間都是對的時間點，
            <br />
            並一步步實現你想活的那個版本的自己。
          </p>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2024 WholeNow Board. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 導航欄 */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">WholeNow Board</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                登入
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                註冊
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要內容區 */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              整合你的筆記與行事曆
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              在一個平台上管理你的所有筆記和行程，讓生活更有條理，工作更有效率。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 text-base font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                開始使用
              </button>
              <button className="px-8 py-3 text-base font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                了解更多
              </button>
            </div>
          </div>

          {/* 功能展示區 */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">筆記管理</h3>
              <p className="text-gray-600 dark:text-gray-400">輕鬆整理和分類你的所有筆記</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">行事曆整合</h3>
              <p className="text-gray-600 dark:text-gray-400">將筆記與行程完美結合</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">跨平台同步</h3>
              <p className="text-gray-600 dark:text-gray-400">隨時隨地存取你的內容</p>
            </div>
          </div>
        </div>
      </main>

      {/* 頁尾 */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2024 WholeNow Board. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

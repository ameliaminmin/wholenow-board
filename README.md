# Wholenow Board
WholeNow Board 是一款結合 視覺化時間軸 × 個人Wiki × 夢想板 的全新行事曆筆記系統，幫助用戶整理人生、釐清方向、紀錄成長。

## 👥 給誰使用？
WholeNow Board 適合：
* 想活得更清楚，對自己有探索慾的人
* 不只是追求效率，更在意「為什麼做這些事」的人
* 有夢想，但想把它具體化、系統化的人
* 經歷變化期，希望釐清人生方向的人
* 喜歡寫日記、做筆記，想升級自己工具的人

## 💫 為什麼要做這個軟體？
因為人生不是任務清單，而是一段旅程。我想打造一款工具，幫助用戶不只是安排時間，而是更深刻地理解自己、設計人生，活出最完整的現在。

## 🌟 核心功能特色
🕰️ 人生時間軸 
多種時間軸類型，讓你從「人生的全貌」到「當下的重點」都能一眼掌握。
支援依據專案與主題分類的專屬時間視圖，讓你的成長、計畫與內在變化，都在對的位置上被看見。

🧠 個人Wiki系統
建立屬於你自己的主題知識庫：成長背景、價值觀、人生信念、情緒模式、關係模式、夢想、與生命覺察......讓你成為自己人生的研究者。為自己做出最佳決策。

🌈 夢想板 
以視覺化的夢想板規劃中長期願景，並對齊短期的任務，將抽象的夢想轉化為可實踐的路徑。

💡 自我探索工具
內建心理學與自我成長工具（例如：情緒日記、價值觀排序、人生願景引導），讓你在寫筆記的過程中不斷認識自己。

🌿 成長紀錄與回顧
每週、每月、每年的回顧模板，透過AI自動幫你追蹤心境與價值觀的變化，打造一份屬於自己的「成長年表」。

## 核心價值
我們相信：
「不是要做更多事，而是要做對的事。不是要掌控人生，而是與它同頻共舞。」

WholeNow Board 是一面鏡子，也是畫布。是人生的儀式感，也是日常的管理術。陪你整合、選擇、記錄，然後，在對的時間點，一步步實現你想活的那個版本的自己。

它不只是安排日子，而是在幫助你看見：🔸你是誰、🔸你走過什麼、🔸你正在成為什麼樣的人。

## Slogan
「讓現在連接全貌，讓行動對齊靈魂。」
「活出你想成為的版本，從看見全貌開始。」


## 技術棧
此專案是使用 Next.js 14、React、TypeScript、Tailwind CSS 和 Firebase 構建的現代化網頁應用程式。

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- Firebase (Firestore & Authentication)
- Vercel (部署)

## 專案結構

```
src/
├── app/                 # Next.js 14 App Router
├── components/          # React 組件
├── lib/                 # 工具函數和配置
│   ├── firebase/       # Firebase 配置和工具
│   └── utils/          # 通用工具函數
├── types/              # TypeScript 類型定義
└── styles/             # 全局樣式
```

## 開始使用

1. 安裝依賴：
```bash
npm install
```

2. 設置環境變數：
創建 `.env.local` 文件並添加以下 Firebase 配置：
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

3. 運行開發服務器：
```bash
npm run dev
```

4. 構建生產版本：
```bash
npm run build
```

## 部署

本專案使用 Vercel 進行部署。只需將代碼推送到 GitHub 倉庫，然後在 Vercel 中導入該倉庫即可自動部署。

## 開發規範

- 使用 TypeScript 進行類型檢查
- 遵循 ESLint 規則
- 使用 Prettier 進行代碼格式化
- 組件使用函數式組件和 Hooks
- 使用 Tailwind CSS 進行樣式設計

## git 分支結構：
   main (生產環境)
     ↑
   develop (開發主分支)
     ↑
   feature/* (功能分支)

## git 提交規範：
使用清晰的提交信息
建議的提交信息格式：
     feat: 添加新功能
     fix: 修復問題
     docs: 更新文檔
     style: 代碼格式修改
     refactor: 代碼重構
     test: 添加測試
     chore: 構建過程或輔助工具的變動
     test: 添加測試

## git 開發流程：
從 develop 分支創建新的功能分支：git checkout -b feature/功能名稱
在功能分支上開發，完成後合併回 develop 分支
當 develop 分支穩定後，合併到 main 分支進行部署

分支命名規範：
功能分支：feature/功能名稱
修復分支：fix/問題描述
熱修復：hotfix/問題描述
發布分支：release/版本號

合併流程：
使用 Pull Request 進行代碼審查
確保代碼通過測試
合併時使用 --no-ff 選項保留分支歷史



## TODO 👩🏻‍💻📱🔮🪄

- AI 聊天室
- 壽命時間軸
- 


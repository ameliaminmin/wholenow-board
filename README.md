# Wholenow Board

這是一個使用 Next.js 14、React、TypeScript、Tailwind CSS 和 Firebase 構建的現代化網頁應用程式。

## 技術棧

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
Apply to README.md
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
在功能分支上開發
完成後合併回 develop 分支
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
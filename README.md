# WebMail Finder Frontend

Modern, responsive web interface for **WebMail Finder** — an intelligent business email discovery tool built with React, Tailwind CSS, Vite, and Lucide Icons.

## ✨ Features

- **Drag & Drop Spreadsheet Upload:** Instant preview and client-side validation for `.xlsx`, `.xls`, and `.csv` files.
- **Smart Column Mapping:** Automatically detects and lets you pick the company website column and customize scan parameters.
- **Live Progress Dashboard:** Real-time visual progress bar, status breakdown (Found, Not Found, Failed), processing speed, and estimated time remaining.
- **Job Controls:** Interactive buttons to **Pause**, **Resume**, **Cancel**, and **Retry Failed** scans on the fly.
- **Interactive Results Table:** Filter by status (`All`, `Found`, `Not Found`, `Failed`), search across domains/emails, and paginate through findings.
- **Direct Spreadsheet Export:** Download updated Excel (.xlsx) or CSV files with emails and source URLs cleanly injected next to the original website column.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linter:** [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/syednehajafferyy/mailfinderfrontend.git
cd mailfinderfrontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API URL (Optional)
By default, the frontend connects to the backend at `http://localhost:8000`. You can configure a custom backend URL by creating a `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Run the development server
```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 5. Build for production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

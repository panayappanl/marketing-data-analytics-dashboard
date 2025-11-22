# Marketing Performance Dashboard

A high-performance React + Vite dashboard that visualizes key marketing metrics from a 5000-record dataset.  
Built as part of a frontend evaluation focused on **performance optimization**, **state management**, and **clean UI architecture** using pure React and Context API.

---

## 🔗 Live Demo  
https://marketing-data-analytics-dashboard.vercel.app/

## 📂 GitHub Repository  
https://github.com/panayappanl/marketing-data-analytics-dashboard

---

## 🚀 Features

- ⚡ **Fast rendering** of ~5000 marketing records using memoized transformations  
- 🔍 **Advanced filtering** (channel, region, search)
- ↕ **Column sorting** with ascending/descending toggle
- 📄 **Pagination** (Prev / Next, Page X of Y)
- 📊 **Performance Insights Chart** using Recharts (Spend vs Conversions by Channel)
- 🧮 **Dynamic Summary Cards** (Spend, Impressions, Clicks, Conversions, CTR)
- 🗂 **Hierarchical Table** (Region → Channels with expand/collapse)
- 🧠 **Optimized state management** using React Context + useMemo + useCallback
- 📱 **Fully responsive design**
- 🎨 **Pure CSS** — no external UI libraries as per assignment requirements

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Context API** (global state)
- **Recharts** (insights visualization)
- **Pure CSS** (custom UI components)
- **Vercel** (deployment)

---

## 📁 Project Structure

src/
components/
Filters/
Summary/
Table/
Charts/
context/
DataContext.jsx
hooks/
useDataProcessing.js
utils/
format.js
calculate.js
data/
marketing.json
styles/
layout.css
table.css
cards.css
filters.css
App.jsx
main.jsx


---

## 🧠 Core Architecture

### **1. Data Loading**
- Dataset loaded from `marketing.json` using `fetch` inside `useEffect`
- Stored in `rawData` inside `DataContext`

### **2. State Management**
Handled by React Context:

- `filters` (region, channel, search)
- `sorting` (column key, direction)
- `pagination` (page, pageSize)

### **3. Derived Data (useMemo)**
All heavy operations are memoized:

- `filteredData`
- `sortedData`
- `paginatedData`
- `groupedData` (region → channels)
- `summaryTotals`
- `performanceByChannel`

This ensures high performance even with 5000+ rows.

### **4. UI Components**
- Table UI is fully custom: sorting, grouping, pagination, drill-down
- Summary card UI: totals & CTR
- Filters bar: dropdowns + search
- Chart: Spend vs Conversions (bar chart)

---

## 📊 Performance Insights Chart

- Aggregates raw data by `channel`
- Computes:
  - total spend
  - total conversions
  - CTR (optional)
- Updates automatically on **filter changes**

---

## 📱 Responsiveness

- Filter bar wraps on smaller screens
- Table scrolls horizontally on mobile
- Cards wrap naturally using flexbox
- Chart becomes full-width on mobile





Install dependencies:


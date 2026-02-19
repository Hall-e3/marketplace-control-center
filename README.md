# Baisoft Marketplace - Frontend (Next.js)

A premium, responsive marketplace dashboard built with Next.js and Tailwind CSS.

## 🚀 Key Features

- **Modern Dashboard UI**: Responsive dashboard built with Tailwind CSS and Radix UI.
- **Zod Validation & React Hook Form**: Robust client-side validation for all forms.
- **RoleGuard Protection**: Component-level and route-level protection based on user roles.
- **Authentication Flow**: JWT integration with persistent sessions (via Redux & TanStack Query).
- **Multi-State Product Management**: UI for creating and managing product lifecycles.
- **Public Marketplace**: A dedicated view for browsing approved products without authentication.

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+
- npm or yarn

### 2. Installation

```bash
cd frontend
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## 🧠 Tech Decisions & Assumptions

- **TanStack Query**: Used for efficient server-state management and caching.
- **Redux Toolkit**: Handles global UI state and authentication persistence.
- **Tailwind CSS**: Rapid development of a custom, premium design system.
- **Registration state syncing**: Manual interaction is recommended for registration to ensure React state updates correctly (known limitation with some automated tools).
- **Product Image Uploads**: Currently uses URL strings as placeholders for future S3/Cloudinary integration.

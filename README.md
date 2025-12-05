# WarriorForge Monorepo

A monorepo containing the WarriorForge backend and frontend applications, managed with npm workspaces.

## 📁 Project Structure

```
warriorforge-monorepo/
├── backend/           # Backend application
│   ├── package.json
│   └── index.js
├── frontend/          # Frontend application
│   ├── package.json
│   └── index.js
├── package.json       # Root package.json with workspace configuration
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (v7 or higher for workspace support)

### Installation

Install all dependencies for both backend and frontend:

```bash
npm install
```

This will install dependencies for the root workspace and all sub-workspaces (backend and frontend).

## 🛠️ Development

### Run Both Applications

To run both backend and frontend in development mode simultaneously:

```bash
npm run dev
```

### Run Backend Only

```bash
npm run dev:backend
```

### Run Frontend Only

```bash
npm run dev:frontend
```

## 🏗️ Building

### Build Both Applications

```bash
npm run build
```

### Build Backend Only

```bash
npm run build:backend
```

### Build Frontend Only

```bash
npm run build:frontend
```

## 🧪 Testing

### Test All Applications

```bash
npm run test
```

### Test Backend Only

```bash
npm run test:backend
```

### Test Frontend Only

```bash
npm run test:frontend
```

## 📦 Working with Dependencies

### Add a Dependency to Backend

```bash
npm install <package-name> --workspace=backend
```

### Add a Dependency to Frontend

```bash
npm install <package-name> --workspace=frontend
```

### Add a Dev Dependency to Root

```bash
npm install <package-name> --save-dev
```

## 🔧 Workspace Commands

You can run any script in a specific workspace using:

```bash
npm run <script-name> --workspace=<workspace-name>
```

Or run a command in all workspaces:

```bash
npm run <script-name> --workspaces
```

## 📝 Next Steps

1. **Backend Setup**: Navigate to `backend/` and add your server framework (Express, Fastify, etc.)
2. **Frontend Setup**: Navigate to `frontend/` and add your frontend framework (React, Vue, etc.)
3. **Configure Build Tools**: Add build configurations (webpack, vite, etc.) as needed
4. **Add Testing**: Set up testing frameworks (Jest, Vitest, etc.) for both applications
5. **Environment Variables**: Create `.env` files for environment-specific configurations

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## 📄 License

ISC
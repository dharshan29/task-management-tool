# Task Management Tool

This is a **Task Management Tool** built using **Next.js**.

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/dharshan29/task-management-tool.git
cd task-management-tool
```

### 2. Install Dependencies
```sh
npm install --force
```
> The `--force` flag is used to install dependencies even if some libraries have compatibility issues.

### 3. Create a `.env` File
Inside the project root, create a `.env` file and add the following:

```
// Backend API URL
NEXT_PUBLIC_BASE_URL=https://your-backend-url.com

// Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```

### 4. Run the Application
```sh
npm run dev
# or
npm start
```

### 5. Open in Browser
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Backend Repository
This project requires a backend server. The backend repository is available at:
[Task Management Backend](https://github.com/dharshan29/task-management-backend.git)

## Live Demo
Check out the live demo at: [Task Management Tool](https://task-management-tool-eosin.vercel.app/login)

## Learn More
To learn more about Next.js, check out:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - contribute or report issues.

## Deployment
The easiest way to deploy a Next.js app is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For deployment details, check [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).


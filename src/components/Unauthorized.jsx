import MainLayout from "../layout/MainLayout";

// pages/Unauthorized.jsx
export default function Unauthorized() {
  return (
    <MainLayout>
    <div className="flex h-screen items-center justify-center text-xl">
      You don’t have permission to access this page.
    </div></MainLayout>
  );
}

import { isAuthenticated } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Panel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  return (
    <main className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-28 md:px-8">
      {authed ? <AdminDashboard /> : <LoginForm />}
    </main>
  );
}
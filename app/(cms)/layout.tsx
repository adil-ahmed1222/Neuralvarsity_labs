import { Sidebar } from "@/components/navigation/Sidebar";
import { TopNav } from "@/components/navigation/TopNav";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Sidebar />
      <div className="pl-64">
        <TopNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

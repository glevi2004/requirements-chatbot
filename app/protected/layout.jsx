"use client";

import { useAuth } from "../../app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar as AppSidebar,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Only redirect if not loading and no user

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <SidebarTrigger />
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}

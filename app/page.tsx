import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between border-b">
        <div className="text-xl font-bold">Baisoft Marketplace</div>
        <nav className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Multi-tenant Product Marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Manage your business products with role-based access control and
          approval workflows.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <Link href="/public/products">
            <Button size="lg" variant="outline">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 h-21.5 bg-orange-600 px-6 flex items-center">
        <h1 className="text-4xl font-bold text-white">
          Recipe Hub Admin
        </h1>
      </header>
      <aside className="fixed left-0 top-21.5 bottom-0 z-40 w-64 overflow-y-auto bg-white p-6">
        <h2 className="mb-8 text-xl font-bold pl-4">Menu</h2>
        <nav className="flex flex-col gap-6">
          <Link href="/dashboard"className="rounded p-3 text-left hover:bg-gray-100">🏠Dashboard</Link>
          <Link href="/recipes" className="rounded p-3 text-left hover:bg-gray-100">🍽️Recipes</Link>
          <Link href="/favourites" className="rounded p-3 text-left hover:bg-gray-100">❤️Favourites</Link>
          <Link href="/users" className="rounded p-3 text-left hover:bg-gray-100">👥Users</Link>
          <Link href="/logout" className="text-red-600 pl-2 "> 🚪 Logout </Link>                            
        </nav>
      </aside>
      <main className="ml-64 mt-21.5 h-[calc(100vh-86px)] overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

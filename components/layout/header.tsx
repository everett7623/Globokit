import Link from 'next/link'
import { Navigation } from './navigation'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
        <Zap className="h-5 w-5 text-white" />
         </div>
         <span className="text-2xl font-bold">🌱 SeedTool</span>
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

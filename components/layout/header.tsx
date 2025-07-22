import Link from 'next/link'
import { Navigation } from './navigation'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo区域 */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SeedTool
              </span>
            </div>

            {/* 中间导航链接 */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                首页
              </Link>
              <Link 
                href="#tools" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                工具集
              </Link>
              <Link 
                href="#about" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                关于
              </Link>
            </div>

            {/* 右侧外部链接 */}
            <div className="flex items-center gap-3">
              <Link 
                href="https://seedloc.com" 
                target="_blank"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                <BookOpen className="h-4 w-4" />
                博客
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link 
                href="https://nav.seedloc.com" 
                target="_blank"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                <Compass className="h-4 w-4" />
                导航站
                <ExternalLink className="h-3 w-3" />
              </Link>
              
              {/* 移动端菜单按钮 */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
        <Navigation />
      </div>
    </header>
  )
}

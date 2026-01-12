// 名称: 导航栏组件
// 描述: 全局顶部导航栏，包含移动端适配、下拉菜单及工具集入口配置
// 路径: Globokit/components/layout/navigation.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { 
  BookOpen, 
  Compass, 
  Menu,
  X,
  ExternalLink,
  Home,
  ChevronDown
} from 'lucide-react'

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { 
    label: '工具集', 
    icon: ChevronDown,
    children: [
      { href: '/tools/rmb-converter', label: '人民币大写转换' },
      { href: '/tools/text-case', label: '英文大小写转换' },
      { href: '/tools/special-char', label: '特殊字符检查' },
      { href: '/tools/number-to-english', label: '数字转英文' },
      { href: '/tools/pinyin', label: '中文转拼音' },
      { href: '/tools/holiday-query', label: '国际节假日查询' },
      { href: '/tools/world-time', label: '世界时间' },
      { href: '/tools/currency-symbols', label: '全球货币符号' },
      { href: '/tools/global-country-info', label: '全球国家信息' },
      { href: '/tools/vps-calculator', label: 'VPS剩余价值计算器' },
    ]
  }
]

const externalLinks = [
  { 
    href: 'https://seedloc.com', 
    label: '博客', 
    icon: BookOpen,
    className: 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
  },
  { 
    href: 'https://nav.seedloc.com', 
    label: '导航站', 
    icon: Compass,
    className: 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm hover:shadow-md'
  }
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)

  // 检查是否为工具页面
  const isToolPage = pathname.startsWith('/tools/');
  
  return (
    <>
      {/* 桌面端导航 */}
      <nav className="ml-auto hidden md:flex items-center space-x-6">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.label} className="relative group">
                <button
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                    isToolPage ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {/* 下拉菜单 */}
                <div
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className={cn(
                    "absolute top-full left-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-2 transition-all",
                    toolsDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  )}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors hover:bg-gray-100",
                        pathname === child.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}

        {/* 外部链接 */}
        <div className="flex items-center gap-3 ml-6 pl-6 border-l border-gray-200">
          {externalLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  link.className
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </Link>
            )
          })}
        </div>
      </nav>

      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden ml-auto p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="px-4 py-4 space-y-2">
            {/* 首页链接 */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-lg text-base font-medium",
                pathname === "/" 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              首页
            </Link>

            {/* 工具集 */}
            <div className="pt-2 pb-1">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                工具集
              </p>
            </div>
            {navItems[1].children?.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm",
                  pathname === tool.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {tool.label}
              </Link>
            ))}

            {/* 外部链接 */}
            <div className="pt-4 border-t border-gray-200">
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

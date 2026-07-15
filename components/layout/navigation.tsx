// 名称: 导航栏组件
// 描述: 统一管理桌面与移动导航的搜索、分类和开关状态
// 路径: Globokit/components/layout/navigation.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { TOOL_REGISTRY, type ToolCategory } from '@/lib/tools/registry'
import { NAV_ACTIVE_CATEGORIES, NAV_TOOLS_BY_CATEGORY } from './navigation-data'
import { DesktopNavigation } from './navigation-desktop'
import { MobileNavigation } from './navigation-mobile'

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ToolCategory>(NAV_ACTIVE_CATEGORIES[0])
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const activeCategoryTools = useMemo(
    () => NAV_TOOLS_BY_CATEGORY[activeCategory] ?? [],
    [activeCategory]
  )

  const filteredTools = useMemo(() => {
    if (!normalizedQuery) return activeCategoryTools

    return TOOL_REGISTRY.filter((tool) => {
      const text = [
        tool.title,
        tool.shortTitle,
        tool.category,
        tool.description,
        ...(tool.keywords ?? []),
      ].join(' ').toLowerCase()

      return text.includes(normalizedQuery)
    }).slice(0, 8)
  }, [activeCategoryTools, normalizedQuery])

  const closeMenus = () => {
    setToolsDropdownOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <DesktopNavigation
        pathname={pathname}
        toolsDropdownOpen={toolsDropdownOpen}
        activeCategory={activeCategory}
        activeCategoryToolsLength={activeCategoryTools.length}
        query={query}
        normalizedQuery={normalizedQuery}
        filteredTools={filteredTools}
        onToolsDropdownOpenChange={setToolsDropdownOpen}
        onActiveCategoryChange={setActiveCategory}
        onQueryChange={setQuery}
        onClose={closeMenus}
      />
      <MobileNavigation
        pathname={pathname}
        open={mobileMenuOpen}
        query={query}
        filteredTools={filteredTools}
        onOpenChange={setMobileMenuOpen}
        onQueryChange={setQuery}
        onClose={closeMenus}
      />
    </>
  )
}

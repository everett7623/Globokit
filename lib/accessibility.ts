// 名称: 可访问性辅助工具
// 描述: 提供键盘导航、焦点管理、屏幕阅读器支持
// 路径: Globokit/lib/accessibility.ts
// 作者: everettlabs
// 更新时间: 2026-07-30

/**
 * 生成唯一的 aria-describedby ID
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 键盘导航辅助类
 */
export class KeyboardNavigationHelper {
  private focusableElements: HTMLElement[] = []
  private currentIndex = 0

  constructor(containerSelector: string) {
    this.updateFocusableElements(containerSelector)
  }

  updateFocusableElements(containerSelector: string) {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    this.focusableElements = Array.from(container.querySelectorAll(selector))
  }

  focusNext() {
    this.currentIndex = (this.currentIndex + 1) % this.focusableElements.length
    this.focusableElements[this.currentIndex]?.focus()
  }

  focusPrevious() {
    this.currentIndex = (this.currentIndex - 1 + this.focusableElements.length) % this.focusableElements.length
    this.focusableElements[this.currentIndex]?.focus()
  }

  focusFirst() {
    this.currentIndex = 0
    this.focusableElements[0]?.focus()
  }

  focusLast() {
    this.currentIndex = this.focusableElements.length - 1
    this.focusableElements[this.currentIndex]?.focus()
  }
}

/**
 * 屏幕阅读器友好的数字格式化
 */
export function formatNumberForScreenReader(value: number, unit?: string): string {
  const formatted = new Intl.NumberFormat('zh-CN').format(value)
  return unit ? `${formatted} ${unit}` : formatted
}

/**
 * 宣布消息给屏幕阅读器（使用 ARIA live region）
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const liveRegion = document.getElementById('sr-live-region') || createLiveRegion()
  liveRegion.setAttribute('aria-live', priority)
  liveRegion.textContent = message

  // 清除消息（避免重复读取）
  setTimeout(() => {
    liveRegion.textContent = ''
  }, 1000)
}

function createLiveRegion(): HTMLElement {
  const region = document.createElement('div')
  region.id = 'sr-live-region'
  region.className = 'sr-only'
  region.setAttribute('aria-live', 'polite')
  region.setAttribute('aria-atomic', 'true')
  document.body.appendChild(region)
  return region
}

/**
 * 检测用户是否使用键盘导航
 */
export function detectKeyboardNavigation(): void {
  let isUsingKeyboard = false

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isUsingKeyboard = true
      document.body.classList.add('using-keyboard')
    }
  })

  document.addEventListener('mousedown', () => {
    isUsingKeyboard = false
    document.body.classList.remove('using-keyboard')
  })
}

/**
 * 焦点陷阱（用于模态框）
 */
export class FocusTrap {
  private container: HTMLElement
  private firstFocusable: HTMLElement | null = null
  private lastFocusable: HTMLElement | null = null
  private previouslyFocused: HTMLElement | null = null

  constructor(containerElement: HTMLElement) {
    this.container = containerElement
    this.updateFocusableElements()
  }

  updateFocusableElements() {
    const focusable = this.container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    this.firstFocusable = focusable[0] || null
    this.lastFocusable = focusable[focusable.length - 1] || null
  }

  activate() {
    this.previouslyFocused = document.activeElement as HTMLElement
    this.firstFocusable?.focus()

    this.container.addEventListener('keydown', this.handleKeydown)
  }

  deactivate() {
    this.container.removeEventListener('keydown', this.handleKeydown)
    this.previouslyFocused?.focus()
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault()
        this.lastFocusable?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault()
        this.firstFocusable?.focus()
      }
    }
  }
}

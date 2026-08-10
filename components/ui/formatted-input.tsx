// 名称: 格式化数字输入组件
// 描述: 支持千分位分隔符、自动聚焦、Enter键提交的数字输入框
// 路径: Globokit/components/ui/formatted-input.tsx
// 作者: everettlabs
// 更新时间: 2026-07-30

'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface FormattedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  format?: 'number' | 'decimal' | 'none'
  maxDecimals?: number
  autoFocusFirst?: boolean
}

/**
 * 格式化数字输入组件
 *
 * 功能:
 * - 千分位分隔符显示（失焦时）
 * - 自动数字键盘（移动端）
 * - Enter 键快速提交
 * - 实时输入验证
 */
export const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  ({ value, onChange, onEnter, format = 'decimal', maxDecimals = 2, autoFocusFirst = false, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [displayValue, setDisplayValue] = useState(value)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isFirstMount = useRef(true)

    const setInputRefs = useCallback((node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
    }, [ref])

    // 自动聚焦第一个输入框
    useEffect(() => {
      if (autoFocusFirst && isFirstMount.current && inputRef.current) {
        // 延迟聚焦，避免页面加载时闪烁
        const timer = setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
        isFirstMount.current = false
        return () => clearTimeout(timer)
      }
    }, [autoFocusFirst])

    // 格式化数字为千分位
    const formatNumber = useCallback((val: string): string => {
      if (format === 'none' || !val || val === '-') return val

      const num = parseFloat(val)
      if (isNaN(num)) return val

      return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maxDecimals,
      }).format(num)
    }, [format, maxDecimals])

    // 移除格式化字符，保留原始数字
    const unformatNumber = (val: string): string => {
      return val.replace(/,/g, '')
    }

    // 更新显示值
    useEffect(() => {
      setDisplayValue(!isFocused ? formatNumber(value) : value)
    }, [value, isFocused, formatNumber])

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      setDisplayValue(unformatNumber(value))
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      const unformatted = unformatNumber(e.target.value)
      onChange(unformatted)
      setDisplayValue(formatNumber(unformatted))
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const unformatted = unformatNumber(rawValue)

      // number 只允许整数；decimal 同时限制小数位数。
      const decimalPattern = new RegExp(`^-?\\d*(?:\\.\\d{0,${Math.max(0, maxDecimals)}})?$`)
      const isValid = format === 'none'
        || !unformatted
        || (format === 'number' ? /^-?\d*$/.test(unformatted) : decimalPattern.test(unformatted))
      if (!isValid) return

      setDisplayValue(rawValue)
      onChange(unformatted)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnter) {
        e.preventDefault()
        onEnter()
      }
      props.onKeyDown?.(e)
    }

    return (
      <Input
        {...props}
        ref={setInputRefs}
        type="text"
        inputMode={format === 'number' ? 'numeric' : format === 'decimal' ? 'decimal' : 'text'}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn('tabular-nums', className)}
      />
    )
  }
)

FormattedInput.displayName = 'FormattedInput'

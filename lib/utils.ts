// 名称: 全局工具函数
// 描述: 提供类名合并(cn)等通用辅助函数，用于Tailwind CSS样式的动态处理
// 路径: Globokit/lib/utils.ts
// 作者: everettlabs
// 更新时间: 2026-01-08

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let idCounter = 0

/**
 * 生成前端临时唯一 id：计数器 + 时间戳 + 随机段，
 * 同一毫秒内连续调用也不会碰撞（React key 与按 id 更新的行编辑依赖它）。
 */
export function createId(prefix: string): string {
  idCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${idCounter.toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

// 名称: 全局工具函数
// 描述: 提供类名合并(cn)等通用辅助函数，用于Tailwind CSS样式的动态处理
// 路径: Globokit/lib/utils.ts
// 作者: Jensfrank
// 更新时间: 2026-01-08

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

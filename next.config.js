// 名称: Next.js 配置文件
// 描述: 定义Next.js框架的核心配置，包括图片域名白名单、严格模式等
// 路径: Globokit/next.config.js
// 作者: Jensfrank
// 更新时间: 2026-01-08

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 优化图片
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // 生产环境优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig

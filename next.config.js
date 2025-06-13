/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 添加自定义配置以确保CSS正确加载
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    // 确保全局样式被正确处理
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    });
    return config;
  },
}

module.exports = nextConfig;    

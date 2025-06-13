// tailwind.config.ts
import { defineConfig } from 'tailwindcss';
import { shadcnTheme } from './lib/theme'; // 假设主题配置存在

export default defineConfig({
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // 确保包含根目录样式
    './globals.css',
  ],
  theme: {
    ...shadcnTheme,
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
});

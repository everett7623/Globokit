// app/_app.tsx
import type { AppProps } from 'next/app';
import '../globals.css'; // 从根目录引入样式

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

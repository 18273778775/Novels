/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 ESLint 检查以提高代码质量
  eslint: {
    ignoreDuringBuilds: false,
    // 在开发环境中显示 ESLint 错误
    dirs: ['pages', 'components', 'lib', 'app'],
  },
  // 启用 TypeScript 检查以捕获类型错误
  typescript: {
    ignoreBuildErrors: false,
    // 在构建时进行严格的类型检查
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
  },
  // 添加实验性功能配置
  experimental: {
    // 启用严格模式以获得更好的性能和错误检测
    strictNextHead: true,
  },
}

export default nextConfig

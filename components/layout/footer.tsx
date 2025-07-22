export function Footer() {
  return (
        {/* 页脚 */}
        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link 
                href="https://seedloc.com" 
                target="_blank"
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                Seedloc 博客
                <ExternalLink className="h-3 w-3" />
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                href="https://nav.seedloc.com" 
                target="_blank"
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                SeedNav 导航
                <ExternalLink className="h-3 w-3" />
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                href="https://github.com/everett7623/seedtool" 
                target="_blank"
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                GitHub
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 SeedTool. Made with ❤️ for traders worldwide.
            </p>
          </div>
        </footer>
  )
}

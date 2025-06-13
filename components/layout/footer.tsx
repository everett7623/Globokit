export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © 2024 SeedTool. Built with ❤️ by everett7623
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/everett7623/seedtool"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Powered by Vercel
          </a>
        </div>
      </div>
    </footer>
  )
}

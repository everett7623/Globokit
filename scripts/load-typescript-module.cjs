const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const moduleCache = new Map()

function resolveLocalModule(fromDirectory, request) {
  const basePath = path.resolve(fromDirectory, request)
  const candidates = path.extname(basePath)
    ? [basePath]
    : [`${basePath}.ts`, `${basePath}.tsx`, `${basePath}.js`, `${basePath}.cjs`, `${basePath}.json`, path.join(basePath, 'index.ts')]
  const resolved = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
  if (!resolved) throw new Error(`Cannot resolve local module ${request} from ${fromDirectory}`)
  return resolved
}

function loadModule(modulePath) {
  const resolvedPath = path.resolve(modulePath)
  if (path.extname(resolvedPath) === '.json') return require(resolvedPath)
  if (!['.ts', '.tsx'].includes(path.extname(resolvedPath))) return require(resolvedPath)

  const cached = moduleCache.get(resolvedPath)
  if (cached) return cached.exports

  const source = fs.readFileSync(resolvedPath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      resolveJsonModule: true,
    },
    fileName: resolvedPath,
  }).outputText
  const loadedModule = { exports: {} }
  moduleCache.set(resolvedPath, loadedModule)

  const localRequire = (request) => {
    if (request.startsWith('@/')) return loadModule(resolveLocalModule(path.join(__dirname, '..'), request.slice(2)))
    if (request.startsWith('.') || path.isAbsolute(request)) return loadModule(resolveLocalModule(path.dirname(resolvedPath), request))
    return require(request)
  }

  Function('exports', 'require', 'module', '__filename', '__dirname', compiled)(
    loadedModule.exports,
    localRequire,
    loadedModule,
    resolvedPath,
    path.dirname(resolvedPath),
  )

  return loadedModule.exports
}

function loadTypescriptModule(relativePath) {
  return loadModule(path.join(__dirname, '..', relativePath))
}

module.exports = { loadTypescriptModule }

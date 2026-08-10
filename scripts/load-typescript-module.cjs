const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

function loadTypescriptModule(relativePath) {
  const modulePath = path.join(__dirname, '..', relativePath)
  const source = fs.readFileSync(modulePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: modulePath,
  }).outputText
  const loadedModule = { exports: {} }

  Function('exports', 'require', 'module', '__filename', '__dirname', compiled)(
    loadedModule.exports,
    require,
    loadedModule,
    modulePath,
    path.dirname(modulePath),
  )

  return loadedModule.exports
}

module.exports = { loadTypescriptModule }

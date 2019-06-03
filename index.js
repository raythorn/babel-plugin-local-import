const filepath = require('path');

function findRelativePath(require) {

}

module.exports = function LocalImport({ types: t }) {
    return {
        visitor: {
            ImportDeclaration: {
                enter(path, state) {
                    const source = path.get('source');
                    let { opts: { libraryName, libraryDirectory } } = state;
                    const srcdir = filepath.parse(state.file.opts.filename).dir;
                    if (source.node.value !== libraryName) {
                        return;
                    }

                    libraryDirectory = libraryDirectory || '';

                    let acturalImportPath = filepath.join(filepath.relative(srcdir, libraryDirectory), libraryName);
                    console.log(acturalImportPath);
                    acturalImportPath = acturalImportPath.replace(/\\/g, '/');
                    console.log(acturalImportPath);
                    if (acturalImportPath[0] !== '.') {
                        acturalImportPath = './' + acturalImportPath;
                    }
                    source.replaceWith(t.stringLiteral(acturalImportPath));
                    // TODO:
                    // const newImports = path.node.specifiers.map( item => {
                    //     return t.importDeclaration([t.importDefaultSpecifier(item.local)], t.stringLiteral(`${alias}/${item.local.name}`))
                    // });
                    // path.replaceWithMultiple(newImports);
                    // should handle import { A as B } from 'C'
                }
            }
        }
    }
}
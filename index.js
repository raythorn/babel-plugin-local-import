const filepath = require('path');

function _camel2dash(_name) {
    const name = _name[0].toLowerCase() + _name.substr(1);
    return name.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

module.exports = function LocalImport({ types: t }) {
    return {
        visitor: {
            ImportDeclaration: {
                enter(path, state) {
                    const source = path.get('source');
                    let { opts: { libraryName, libraryDirectory, subdirectory, camel2dash, expand } } = state;
                    const srcdir = filepath.parse(state.file.opts.filename).dir;
                    if (source.node.value !== libraryName) {
                        return;
                    }

                    libraryDirectory = libraryDirectory || '';
                    subdirectory = subdirectory || '';

                    let acturalImportPath = filepath.join(filepath.relative(srcdir, libraryDirectory), libraryName);
                    acturalImportPath = acturalImportPath.replace(/\\/g, '/');
                    if (acturalImportPath[0] !== '.') {
                        acturalImportPath = './' + acturalImportPath;
                    }

                    if (!expand) {
                        source.replaceWith(t.stringLiteral(acturalImportPath));
                        return;
                    }

                    if (subdirectory !== '') acturalImportPath = acturalImportPath + '/' + subdirectory;
                    const newImports = path.node.specifiers.map( item => {
                        let name = item.imported.name;
                        if (camel2dash) {
                            name = _camel2dash(name);
                        }
                        return t.importDeclaration([t.importDefaultSpecifier(item.local)], t.stringLiteral(`${acturalImportPath}/${name}`))
                    });
                    path.replaceWithMultiple(newImports);
                }
            }
        }
    }
}

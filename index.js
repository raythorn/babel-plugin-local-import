const join = require('path').join;

module.exports = function LocalImport({ types: t }) {
    return {
        visitor: {
            ImportDeclaration: {
                enter(path, state) {
                    const source = path.get('source');
                    let { opts: { libraryName, libraryDirectory } } = state;
                    if (source.node.value !== libraryName) {
                        return;
                    }

                    libraryDirectory = libraryDirectory || '';
                    let acturalImportPath = join(libraryDirectory, libraryName);
                    acturalImportPath = acturalImportPath.replace('\\', '/');
                    if (acturalImportPath[0] !== '.') {
                        acturalImportPath = './' + acturalImportPath;
                    }
                    source.replaceWith(t.stringLiteral(acturalImportPath));
                }
            }
        }
    }
}
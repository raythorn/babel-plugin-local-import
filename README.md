# babel-plugin-local-import

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/babel-plugin-local-import.svg?style=flat-square
[npm-url]: http://npmjs.org/package/babel-plugin-local-import
[download-image]: https://img.shields.io/npm/dm/babel-plugin-local-import.svg?style=flat-square
[download-url]: https://npmjs.org/package/babel-plugin-local-import

## install
   [![ljshell](https://nodei.co/npm/babel-plugin-local-import.png)](https://npmjs.org/package/babel-plugin-local-import)

### Feature
----
A simple babel plugin for importing local module as in node_modules, 
and don't need to write tediously long relative path while importing.

### Keywords
----
* babel plugin
* import module
* local module
* relative path
* import module on demand

### Usage
---
configure local module path in .babelrc, for example, a local module in './local/path/moduleA'
```json
{
    "plugins": [
        ["local-import", { 
            "libraryName": "moduleA", 
            "libraryDirectory": "./local/path" 
        }],
        ["local-import", { 
            "libraryName": "moduleB", 
            "libraryDirectory": "./local/path",
            "subdirectory": "src/components",
            "camel2dash": true,
            "expand": true,
        }],
    ]
}
```
and now, we can import component from 'moduleA' just as it's installed node_modules directory:
```js
import test from 'moduleA';
```
which will be compiled as:
```js
import test from './local/path/moduleA';
```
---
if you want import component from 'moduleB' on demand:
```js
import { TestFunc, TestParam } from 'moduleB';
```
which will be compiled as:
```js
import TestFunc from './local/path/moduleB/src/components/test-func';
import TestParam from './local/path/moduleB/src/components/test-param';
```

const fs = require('fs')
const path = require('path')
const util = require('util')
const debug = require('debug')('util/fs.fs')
const { commandList } = require('../../index')

const findFileInAncestry = function*(fileName, rootFolder) {
    if (!rootFolder) rootFolder = process.cwd()
    let rootParts = rootFolder.split(path.sep).filter(p => p !== '')
    while (rootParts.length > 0) {
        let filePath = path.resolve('/', rootParts.join(path.sep), fileName)
        try {
            if (fs.statSync(filePath).isFile()) yield filePath
        } catch (e) {
            debug(e.message)
        }
        rootParts.pop()
    }
    return null
}

const mergeFileObjects = (fileArray, reverse = false) => {
    let out = {}
    let arr = reverse ? fileArray.reverse() : fileArray
    debug({ fileArray, arr, reverse })
    arr.forEach(file => {
        let obj = {}
        try {
            obj = commandList(require(file))
            debug({ file, obj })
        } catch (e) {}
        out = Object.assign(out, obj)
    })
    return out
}

module.exports = {
    findFileInAncestry,
    mergeFileObjects
}

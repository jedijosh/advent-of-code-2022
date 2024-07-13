import { parseFileIntoArrayOfLines } from '../../utils'
const dataFolder = '/mnt/c/Users/joshs/code/advent-of-code-2022-data/day7/data'

const LOGGING = false

class File {
    name: string
    size: number

    constructor(name: string, size: number) {
        this.name = name
        this.size = size
    }
}

class Directory {
    name: string
    parentDirectory?: Directory
    subDirectories: Directory[]
    files: File[]
    size: number

    constructor(name: string, subDirectories: Directory[] = [], files: File[] = []) {
        this.name = name
        this.subDirectories = subDirectories
        this.files = files
        this.size = 0
    }

    public getSizeOfDirectory() {
        let directorySize: number = 0
        // Find the size of each file in this directory
        this.files.forEach(file => {
            directorySize += file.size
        })
        
        // Find the size of each file in the subdirectories
        this.subDirectories.forEach(directory => {
            directorySize += directory.getSizeOfDirectory()
        })

        this.size = directorySize
        return directorySize
    }

    public getParentDirectory() {
        if (!this.parentDirectory) {
            throw new Error('No parent directory exists')
        }
        return this.parentDirectory
    }

    public setParentDirectory(parentDirectory: Directory) {
        this.parentDirectory = parentDirectory
        return true
    }
}

export async function solution ( filename : string, maxSize: number, partNumber: number) {
    const totalDiskSpace: number = 70000000
    const freeSpaceNeeded: number = 30000000

    let result: number = 0
    let usedDiskSpace: number = 0
    let directorySizes: Map<string, number> = new Map()
    let directories: Directory[] = []

    let fileLines : string[] = await parseFileIntoArrayOfLines(filename, true)
        
    // Read through instructions to create the appropriate directories and files
   
    let currentDirectory: Directory = new Directory('/')
    directories.push(currentDirectory)
    for (let lineNumber = 0; lineNumber < fileLines.length; lineNumber++) {
        // If line starts with $, it's a command
        // cd command changes directory
        // ls command lists contents.  $ on line would indicate end of ls
            // If line starts with "dir", this is listing a subdirectory
            // If line starts with a number, this is a file and its size

        let splitLine = fileLines[lineNumber].split(' ')
        if (splitLine[0] === '$') {
            if (splitLine[1] === 'cd') {
                if (LOGGING) console.log(`cd command found, current directory is ${currentDirectory.name}`)
                // If string is "..", go up a directory to the parent
                if(splitLine[2] === '..') {
                    currentDirectory = currentDirectory.getParentDirectory()
                } else if (splitLine[2] === '/') {
                    let subDirectory = currentDirectory.subDirectories.find(directory => directory.name === splitLine[2])
                    if (subDirectory) currentDirectory = subDirectory
                } else {
                    // Else, we are going into a subdirectory
                    // subDirectories: Directory[]
                    let directoryName = splitLine[2]
                    let subDirectory = currentDirectory.subDirectories.find(directory => directory.name === directoryName)
                    if (subDirectory) {
                        currentDirectory = subDirectory
                    } else {
                        if (LOGGING) console.log(`creating new directory for ${directoryName}`)
                        subDirectory = new Directory(directoryName)
                        subDirectory.setParentDirectory(currentDirectory)
                        currentDirectory.subDirectories.push(subDirectory)
                        directories.push(subDirectory)
                        currentDirectory = subDirectory
                    }

                }
                if (LOGGING) console.log(`after cd command, current directory is ${currentDirectory.name}`)
            }
            if (splitLine[1] === 'ls') {
                if (LOGGING) console.log(`ls command found, current directory is ${currentDirectory.name}`)
                lineNumber++
                splitLine = fileLines[lineNumber].split(' ')
                while (splitLine[0] !== '$') {
                    if (LOGGING) console.log(`in ls command, current line is ${splitLine}`)
                    let fileSize: number = Number.parseInt(splitLine[0])
                    // If fileSize is not a number, the entry is a directory
                    if (Number.isNaN(fileSize)) {
                        if (LOGGING) console.log(`adding new subdirectory named ${splitLine[1]}`)
                        let subDirectory = new Directory(splitLine[1])
                        subDirectory.setParentDirectory(currentDirectory)
                        currentDirectory.subDirectories.push(subDirectory)
                        directories.push(subDirectory)
                    } else {
                        if (LOGGING) console.log(`adding new file named ${splitLine[1]} with size ${fileSize}`)
                        currentDirectory.files.push(new File(splitLine[1], fileSize))
                    }
                    lineNumber++
                    if (lineNumber === fileLines.length) break
                    splitLine = fileLines[lineNumber].split(' ')
                }
                // Need to decrement lineNumber to ensure we don't read past the end of the file
                lineNumber--
            }
        }
    }
    
    directories.forEach(directory => {
        if (LOGGING) console.log('directoryName', directory.name)
        let directorySize = directory.getSizeOfDirectory()
        if (partNumber === 1 && directorySize < maxSize) result += directorySize
        if (directory.name === '/') usedDiskSpace = directorySize
        directorySizes.set(directory.name, directorySize)
    })

    if (partNumber === 2) {
        let amountToDelete = freeSpaceNeeded - (totalDiskSpace - usedDiskSpace)
        if (LOGGING) console.log('amountToDelete:', amountToDelete)
        let directoriesSortedBySize = directories.sort((a, b) => a.size - b.size)
        if (LOGGING) console.log('directoriesSortedBySize', directoriesSortedBySize)
        result = directoriesSortedBySize.find(directory => directory.size > amountToDelete)?.size || 0
    }
    


    if (LOGGING) console.log('directorySizes', directorySizes)

    return result
}

// solution(dataFolder + '/tests/input.txt', 100000, 1)
// solution(dataFolder + '/input.txt', 100000, 1)

// solution(dataFolder + '/tests/input.txt', 100000, 2)
solution(dataFolder + '/input.txt', 100000, 2)
    .then(answer => console.log('answer:', answer))

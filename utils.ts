const fs = require('node:fs/promises')

export async function parseFileIntoArrayOfLines ( filename : any, trimInput: boolean = true) {
    let file = await fs.open(filename)
    let fileInput = await file.readFile({ encoding: 'utf8'})
    file.close()

    if (trimInput) {
        return fileInput.trim().split('\n')
    } else {
        return fileInput.split('\n')
    }
    
}

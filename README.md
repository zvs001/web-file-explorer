
Library for using web input file explorer. 

It creates hidden `<input type="file" />` element. Useful for custom uploading buttons, etc. 

[![npm](https://img.shields.io/npm/v/web-file-explorer)](https://www.npmjs.com/package/web-file-explorer)

#### Install: 
- `npm i -S web-file-explorer` 
- `yarn add web-file-explorer`

# Usage

Open file explorer and get file:
```typescript
import fileExplorer from 'web-file-explorer'

const file      = await fileExplorer.getFile()
const imageFile = await fileExplorer.getFile({ acceptImage: true })
```

# API

- `accept` (optional) `string | string[]` - list of allowed mime types
- `acceptImage` (optional) `boolean` -  allow image files. Popular formats only by default.
- `acceptVideo` (optional) `boolean` - allow video files. Popular formats only by default.
- `acceptAudio` (optional) `boolean` - allow audio files. Popular formats only by default.

If there no filters applied. Accept field will be `'*'`

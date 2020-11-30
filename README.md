
Library boost for browser file explorer.

[![npm](https://img.shields.io/npm/v/web-file-explorer)](https://www.npmjs.com/package/web-file-explorer)

# Usage

Open file explorer and get file:
```typescript
const file = await fileExplorer.getFile({ acceptImage: true })
```

# API

- `accept` (optional) `string | string[]` - list of allowed mime types
- `acceptImage` (optional) `boolean` -  allow image files. Popular formats only by default.
- `acceptVideo` (optional) `boolean` - allow video files. Popular formats only by default.
- `acceptAudio` (optional) `boolean` - allow audio files. Popular formats only by default.

If there no filters applied. Accept field will be `'*'`

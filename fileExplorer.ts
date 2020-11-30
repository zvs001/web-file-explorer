import _ from 'lodash'

type Accept = boolean | '*' | string | string[]
type MimeType = 'audio' | 'video' | 'image'

export interface FileExplorerGetFileOptions {
  accept?: string
  acceptVideo?: Accept
  acceptImage?: Accept
  acceptAudio?: Accept
}

const defaultAudio = ['mp3', 'wav', 'mpeg']
const defaultAudioMimes = defaultAudio.map(ext => `audio/${ext}`)

const defaultVideo = ['mp4', 'm4a', 'fmp4', 'mkv', 'flv', 'webm']
const defaultVideoMimes = defaultVideo.map(ext => `video/${ext}`)

const defaultImage = ['png', 'jpeg', 'jpg', 'bmp', 'gif']
const defaultImageMimes = defaultImage.map(ext => `image/${ext}`)

function toMime(txt: string, type: MimeType): string {
  const prefix = `${type}/`
  if (txt.includes(prefix)) return txt

  return `${prefix}${txt.replace(prefix, '')}`
}

function getAudioMimes(acceptAudio: Accept): string[] {
  if (_.isBoolean(acceptAudio)) return defaultAudioMimes
  if (_.isString(acceptAudio)) return [toMime(acceptAudio, 'audio')]

  return _.map(acceptAudio, acceptItem => toMime(acceptItem, 'audio'))
}

function getVideoMimes(acceptVideo: Accept): string[] {
  if (_.isBoolean(acceptVideo)) return defaultVideoMimes
  if (_.isString(acceptVideo)) return [toMime(acceptVideo, 'video')]

  return _.map(acceptVideo, acceptItem => toMime(acceptItem, 'video'))
}

function getImageMimes(acceptImage: Accept): string[] {
  if (_.isBoolean(acceptImage)) return defaultImageMimes
  if (_.isString(acceptImage)) return [toMime(acceptImage, 'image')]

  return _.map(acceptImage, acceptItem => toMime(acceptItem, 'image'))
}

function getFile(options?: FileExplorerGetFileOptions): Promise<File> {
  let { accept = '', acceptVideo = false, acceptImage = false, acceptAudio = false } = options || {}

  let formats: string[] = []
  if (acceptVideo) formats = formats.concat(getVideoMimes(acceptVideo))
  if (acceptImage) formats = formats.concat(getImageMimes(acceptVideo))
  if (acceptAudio) formats = formats.concat(getAudioMimes(acceptAudio))

  accept += formats.join(',')

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept || '*'
  document.body.appendChild(input)

  return new Promise((resolve, reject) => {
    const listener = async event => {
      if (!event.target) return close(event, reject)
      const { files } = event.target as { files: FileList }
      if (!files || !files[0]) return close(event, reject)

      const file = files[0]

      close(event, () => resolve(file))
    }

    input.addEventListener('change', listener)

    input.click()

    function close(event, cb) {
      cb()
      input.remove()
      input.removeEventListener('change', listener)
      event.target.value = ''
    }
  })
}

export default {
  getFile,
}

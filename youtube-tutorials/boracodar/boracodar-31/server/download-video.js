import fs from 'node:fs'
import ytdl from 'ytdl-core'

export const downloader = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`
    console.log(`[START_DOWNLOAD] ${videoUrl}`)

    ytdl(videoUrl, {
      quality: 'lowestaudio',
      filter: 'audioonly',
    })
      .on('end', () => {
        console.log(`[FINISHED_DOWNLOAD]`)
        resolve()
      })
      .on('error', () => {
        console.log(`[ERROR_DOWNLOAD]`)
        reject('[ERROR_DOWNLOADING_VIDEO]')
      })
      .pipe(fs.createWriteStream('audio.mp4'))
  })

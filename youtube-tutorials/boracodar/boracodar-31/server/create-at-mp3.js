import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'

export const createAtMP3 = () =>
  new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic)

    ffmpeg()
      .input('audio.mp4')
      .outputOptions('-ab', '20k')
      .saveToFile('audio.mp3')
      .on('progress', () => {
        if (process.percent) {
          console.log(`Processing ${Math.floor(process.percent)}% done`)
        }
      })
      .end('end', () => {
        console.log('finished processing')
        resolve()
      })
      .on('error', () => {
        console.log(error)
        reject(error)
      })
  })

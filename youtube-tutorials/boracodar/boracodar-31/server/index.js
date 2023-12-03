import cors from 'cors'
import express from 'express'
import { downloader } from './download-video.js'

const app = express()
app.use(cors())

app.get('/audio', async (req, res) => {
  const videoId = req.query.v

  try {
    // download
    await downloader(videoId)

    // criar mp3

    return res.send('ok')
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
})

app.listen(3333, () => console.log('server is running 🚀'))

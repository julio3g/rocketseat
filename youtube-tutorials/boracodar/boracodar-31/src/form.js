import axios from 'axios'
import { loadingMessage, startLoading, stopLoading } from './loading'
import { getVideoId, loadVideo } from './youtube-api'

const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    loadingMessage('Inciando a aplicação')
    startLoading()
    // pegar o form

    const formData = new FormData(form)
    const url = formData.get('url')

    // loadVideo
    await loadVideo(url)

    loadingMessage('Iniciando e convertendo o video')
    await axios.get(`http://localhost:3333/audio?v=${getVideoId(url)}`)
  } catch (e) {
    console.log('[SUBMIT_ERROR]', e)
  } finally {
    stopLoading()
  }
})

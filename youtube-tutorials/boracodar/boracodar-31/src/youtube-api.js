import { loadingMessage } from './loading'

let tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

window.YTPlayer = null

export function getVideoId(url) {
  const [part1, part2] = url.split('?v=') // ira dividir a url em URL: https://www.youtube.com/watch ID:w0h1JGeVqFg
  const [videoId, others] = part2.split('&') // ira ver se tem algo a mais na url
  return videoId
}

export function loadVideo(url) {
  loadingMessage('Carregando video do YouTube')

  return new Promise((resolve, reject) => {
    window.YTPlayer = new YT.Player('youtubeVideo', {
      videoId: getVideoId(url),
      events: {
        onReady: () => resolve(),
      },
    })
  })
}

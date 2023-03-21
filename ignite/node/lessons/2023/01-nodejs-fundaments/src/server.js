import http from 'node:http'
import { extractQueryParams } from './extractQueryParams.js'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// UUID => Universal Unique ID

// Query Parameters: URL Stateful => Filtros, paginacao, nao-obrigatorios (Ex: http://localhost:3333/users?userId=1&name=John)
// Route Parameters: Identificacao de recurso (Ex: GET http://localhost:3333/users/1 ou DELETE http://localhost:3333/users/1)
// Request Body: Envio de informacoes de um formulario (HTTPS) (Ex: POST http://localhost:3333/users)

// O texto fala sobre como os seres humanos podem usar a percepção, cognição, e usar os nossos cérebros para pensar e
// definir ações para realizar um objetivo, além de possuirmos livre controle do corpo para essas ações tomarem forma.
// A equipe em questão citada no texto está tentando reconstruir essas capacidades em robôs, com sensores artificiais
// como câmeras, scanners, microfones, algoritmos e atuadores que controlam tais mecanismos para imitar as capacidades humanas.

// text 2: "Nós introduzimos o conceito de 'autonomia simbiótica' para permitir que robôs peçam ajuda a humanos ou à internet. Agora, robôs e humanos em nosso prédio ajudam uns aos outros a superar as limitações de cada um."

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.params
    req.params = params
    req.query = query ? extractQueryParams(routeParams.groups.query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})
server.listen(3333)

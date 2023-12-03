import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'

import { createTranscriptionRoute } from './routes/createTranscription'
import { generateAiCompletionRoute } from './routes/generateAiCompletion'
import { getAllPromptsRoute } from './routes/getAllPrompts'
import { uploadVideoRoute } from './routes/uploadVideo'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })

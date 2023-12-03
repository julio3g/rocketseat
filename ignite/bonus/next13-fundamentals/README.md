Posso fazer vários layout dentro das pastas

Caso tenha uma rota `auth/login` e não quero que mostre auth, é só colocar entre parenteses () `(auth)`, a rota vai ficar em o auth

Para criar um rota que vai ter um parâmetro, precisa usar colchetes [] no nome da pasta e colocar dentro `page.tsx`. Por exemplo: [id]

Para criar uma rota com múltiplos parâmetros criar pasta com [...data], não precisa ser necessariamente ...data, pode ser um nome genérico ou nome relacionado com a rota

Server Components -> A gente não USA JavaScript no lado do cliente
Client Components -> O JavaScript é enviado ao navegador (cliente) `'use client'`

Quando tem um fetch que irá demorar para ter uma resposta e precise de um loading, crie um arquivo `loading.tsx` no mesmo diretório da página que ira ter o fetch de dados

Streaming SSR -> Ler/escrever dados de forma parcial + Server-side Rendering

Renderizar um componente pelo lado do servidor de forma PARCIAL

Bibliotecas para Fetch de Dados no ReactJS [https://tanstack.com/query/latest](TanStack Query ), SWR, UQRL (Caso use GRAPHQL)

Para colocar um server component, Deve coloca-lo como children

O Suspense é um componente que pode ser usado para envolver outros componentes que demoram a ser carregados. Ele recebe uma propriedade chamada Fallback, que define o que será mostrado enquanto o componente ainda não foi carregado. Podemos criar seções de carregamento na página usando o Suspense, como um Spinner ou uma Skeleton Screen.

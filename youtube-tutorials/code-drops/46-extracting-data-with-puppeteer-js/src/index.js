import { writeFile } from 'fs';
import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://rocketseat.com.br')

  const imgList = await page.evaluate(() => {
    // toda a função será executada no browser
    // pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('li.styles_item__FDs0w img')
    // transformar os node (elements html) em objetos JS
    const imgList = Array.from(nodeList).map(({ src }) => ({ src }))
    // colocar para fora da função
    return imgList
  })

  // escrever os dados em um arquivo local (json)
  writeFile('instagram.json', JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error('something went wrong')

    console.log('well done!')
  })

  await browser.close()
})()

import fs from 'node:fs/promises';

// import.meta.url é o __dirname ou __filename, porém só pode ser utilizado quando o package.json tiver o "type": "module"

const databasePath = new URL('../db.json', import.meta.url)

// o primeiro parâmetro do URL é a mesma coisa que {cd} no terminal

export class Database {
  #database = {}

  constructor() {
    fs.writeFile(databasePath, 'utf8').then(data => this.#database = JSON.parse(data)).catch(()=> this.#persist())
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    // let it change

    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }
  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex >= -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex >= -1) {
      this.#database[table].slice(rowIndex, 1)
      this.#persist()
    }
  }
}

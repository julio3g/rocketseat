// Nomenclatura de variáveis

const users = ['Diego', 'Mayk', 'Juan']

const usersStartingWithLetterD = users.filter((user) => {
  return user.startsWith('D')
})

// ----------------------------------------------------------------

// Evite nomes genericos (data, response, list, args, params)

function getUsersFromDataBase() {
  return users
}

function getUsers() {
  const data = getUsersFromDataBase()

  // trocar {data} por users
  const users = getUsersFromDataBase()

  return users
}

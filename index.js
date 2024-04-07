const express = require ('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

/*
    - Query params => meusite.com/users?nome=rodolfo&age=28 // FILTROS
    - Route params => /users/2      // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => { "name":"Rodolfo", "age":}

    - GET          => Buscar informação no back-end
    - POST         => Criar informação no back-end
    - PUT / PATCH  => Alterar/Atualizar informação no back-end
    - DELETE       => Deletar informação no back-end

    - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/

const users = []
// app.get('/users/:id', (request, response) => {
// app.get('/users', (request, response) => {
    
 // const {name, age} = request.body
 // console.log(request.body)

 // const { id } = request.params
 // console.log(id)
 // const name = request.query.name
 // const age = request.query.age
 // const {name, age} = request.query // Destructuring assignment(MESMA COISA QUE O DE CIMA)
 
const checkUserId = (request, response, next) => {
    
    const { id } = request.params

    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}
 
app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age}
    
    users[index] = updateUser
    
    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json(users)
})









app.listen(port, () =>{
    console.log(`🚀 Server started on port ${port}`)
})
const express = require('express')
const morgan = require('morgan')
const app = express()
let products = [
    {
        id: 1,
        name: "laptop",
        price: 1000
    }
]
//MIDDLEWARE
app.use(morgan('dev')) //para ver los mensajes mas detallador del servidor
app.use(express.json())

//ROUTES
app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const newProduct = {...req.body, id:products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})

app.put('/products/:id', (req, res) => {
    const newData = req.body
    const prodFound = products.find(function (product) {
        return product.id === parseInt(req.params.id)
    })
    if(!prodFound)
        return res.status(404).json({
            message: "no se encontro el producto"
        })
    
    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)
    res.json({"message": "Producto actualizado"})
})

app.delete('/products/:id', (req, res) => {
    const prodFound = products.find(function (product) {
        return product.id == req.params.id
    })
    if(!prodFound) return res.status(404).json({message: "no se encontro el producto"})
    products = products.filter(p => p.id !== parseInt(req.params.id))
    res.sendStatus(204)
})

app.get('/products/:id', (req, res) => {
    const prodFound = products.find(function (product) {
        return product.id == req.params.id
    })
    if(!prodFound) return res.status(404).json({message: "no se encontro el producto"})
    console.log(prodFound)
    res.json(prodFound)
})

app.listen(3000)

console.log(`server on port ${3000}`)
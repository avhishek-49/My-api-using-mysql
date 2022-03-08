const express = require('express')
const bodyParser = require('body-parser')
const { Author, Book } = require('./sequelize')


const app = express()
app.use(bodyParser.json())

// Create a Author
app.post('/demoApi/author', (req, res) => {
    console.log(req.body)
    Author.create(req.body)
        .then(author => res.json(author))
})
// create a book
app.post('/demoApi/book', (req, res) => {
    console.log("book==>", req.body)
    Book.create(req.body)
        .then(author => res.json(author))
})
// get all books
app.get('/demoApi/books', (req, res) => {
    Book.findAll().then(books =>
        res.json(books))
})
// get all authors
app.get('/demoApi/authors', (req, res) => {
    Author.findAll().then(authors =>
        res.json(authors))
})

// get book by  bookId
app.get('/demoApi/book/:id', (req, res) => {
    Book.findOne(
        {
            where: { id: req.params.id, },
        }
    ).then(book => res.json(book))
})
// get author by id
app.get('/demoApi/author/:id', (req, res) => {
    Author.findOne(
        {
            where: { id: req.params.id, },
        }
    ).then(author => res.json(author))
})

// get author with his book list
app.get('/demoApi/authorHasManyBooks/:id', (req, res) => {
    let query;

    query = Author.findAll({
        where: { id: req.params.id, },
        include: [{ model: Book }
        ]
    })

    return query.then(author => res.json(author))
})



//delete of author

app.delete("/demoApi/authorHasManyBooks/:id",(req,res)=>
{
    let query;
    query=Author.destroy(
        {
            where: { id: req.params.id, },
            include: [{ model: Book }
            ]   
        }
)
return query.then(()=>res.json("deleted sucessfully"))
});







//delete of book

app.delete("/demoApi/:id",(req,res)=>
{
    let query;
    query=Book.destroy(
        {
            where: { id: req.params.id, },
            include: [{ model: Book }
            ] 
            
        }
)
return query.then(()=>res.json("deleted sucessfully"))
});


//update of Authorr hai babu




// app.put("/update/Author/:id",(req,res)=>
// {
//     let query;
//     query=Author.update(

//         {
//             Author:req.body.Author
//         },


//         {
//             where: { id: req.params.id },
//             include: [{ model: Book }
//             ] 
            
//         }
// )
            
           
        

// return query.then(()=>res.json("updated sucessfully"))
// });

// author update gareko hai vaii 


app.put("/update/author", (req, res) => {
    
    let query;
    
    

   query=Author.update(
      {
        authorName: req.body.authorName
      },
      {
        where: { id: req.body.id }
      }
    )
    
    return query.then(()=>res.json("updated sucessfully"))
    
  });


  //book update gareko hai vai

  
app.put("/update/book", (req, res) => {
    
    let query;
    
    

   query=Book.update(
      {
        bookName: req.body.bookName
      },
      {
        where: { id: req.body.id }
      }
    )
    
    return query.then(()=>res.json("updated sucessfully"))
    
  });


  















const port = 8080
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

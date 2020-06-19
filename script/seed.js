const {green, red} = require('chalk')
const db = require('../server/db')
const {Book, Author} = require('../server/db/models')
const data = require('./data.json')

const seed = async () => {
  try {
    await db.sync({force: true})

    const books = data.allBooks
    const seedAuthors = {}

    for (let i = 0; i < books.length; i++) {
      const price = parseInt(books[i].price) * 100
      const book = await Book.create({
        name: books[i].name,
        image: books[i].image,
        tag: books[i].tags,
        price: price
      })
      if (books[i].authorName) {
        let author
        if (seedAuthors[books[i].authorName]) {
          author = seedAuthors[books[i].authorName]
        } else {
          author = await Author.create({name: books[i].authorName})
          seedAuthors[books[i].authorName] = author
        }
        await book.setAuthor(author)
      }
    }
    // const user1 = await User.create(seededUsers[0])
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh no! Error with our seed file'))
      console.error(err)
      db.close()
    })
}

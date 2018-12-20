module.exports = {
  getQuotes: (req,res) => {
    const db = req.app.get('db'); //calling the db and setting it as a var
    db.read_quotes().then(quotes => { //getting the quotes from db
      res.send(quotes);
    }).catch(error => {
      console.log('error in getquotes', error);
      res.status(500).send('quotesController get error')
    })
  }
}
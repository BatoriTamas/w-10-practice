const express = require('express')
const path = require('path') //importálás, ezzel tudunk a file-rendszerünkben mozogni.
const fs = require("fs")
const app = express()
const port = 9000

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.use('/public', express.static(`${__dirname}/../frontend/public`))

app.get('/data', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/data.json`))
})

app.get('/data/:id', (req, res) => {
  console.log(req.params)
	try {
		const searchId = parseInt(req.params.id)
		console.log(searchId)

		if(isNaN(searchId)) {
			res.status(418).send("I am not a number. I am a free man.")
		} else {
			fs.readFile(`data/data.json`, (err, data) => {
				let result = null
				const fileData = JSON.parse(data)
				console.log(fileData)
				for (let index = 0; index < fileData.length; index++) {
					const element = fileData[index];
					if(element.id === searchId) {
						console.log(element)
						result = element
					}
				}
				
				if(result === null) {
					res.status(404).send("This beer does not exist.")
				} else {
					res.send(result)
				}
			})
		}

	} catch(error){
		console.log(error)
		res.send("You're in trouble, dear")
	}
})











app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})


const Express = require('express')
const server = new Express()

const fs = require('fs')
const path = require('path')
// Controllers
const buildController = require('./controllers/buildController')

server.use(Express.static('public'));
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '/views'));


server.get('/', (req,res) => {
    res.send('Gerar apostilas')
})

server.get('/languages/:language', (req,res) => {    
    const LANGUAGE = req.params.language
    const languageBuildedHTMLFolder = `./apostilas/${LANGUAGE}/build/html-builded`
    const chaptersArray = fs.readdirSync(languageBuildedHTMLFolder).map(chapter => chapter.replace('.html', ''))

    res.render('languages/chapterList', { chapters: chaptersArray, language: LANGUAGE })
})

server.get('/languages/:language/:chapter', (req,res) => {    
    const content = fs.readFileSync(`./apostilas/java/build/html-builded/${req.params.chapter}.html`, "utf8");

    console.log(content)

    res.render('languages/chapter', { content })
})

server.get('/build/:language', buildController)

server.listen(3000, () => console.log('Servidor subiu na porta 3000'))




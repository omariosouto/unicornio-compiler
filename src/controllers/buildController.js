module.exports = (req,res) => {
    const LANGUAGE = req.params.language


    // 1 - Gera o HTML
    const exec = require('child_process').exec;
    exec(`./node_modules/.bin/gulp --language ${LANGUAGE}`, function(error, stdout, stderr) {    
        if (error) console.log(error.code);
        console.log('Stage - [html-partial]')
        generateInteractiveDoc()
        console.log('Stage - [html-builded]')
        res.send(`Apostila de [${LANGUAGE}] buildada com sucesso :)`)
    });
    
    
    // 2 - Gera um JSON com os dados do curso:
    const fs = require('fs')
    const buildedHtmlPath = './apostilas/java/build/html-partial/index.html'
    
    function generateInteractiveDoc() {
        fs.readFile(buildedHtmlPath, "utf8", function(err, data) {
            if (err) throw err;
            mapHtmlToInteractiveDoc(data)
        });
    }
    
    // # Isomorpich Code
    const cheerio = require('cheerio')
    process.env.LANGUAGE = 'java'
    
    function mapHtmlToInteractiveDoc(html) {
        const $ = cheerio.load(html)
    
        $('.doc-article').map((index, element) => {
            let $currentChapter = $(element)
            formatCompilerCode($currentChapter, $)
    
            const chapterSlug = $currentChapter.find('.doc-nav-anchor').attr('name')
            generateFiles($currentChapter.html(), `./apostilas/${LANGUAGE}/build/html-builded/${chapterSlug}.html`)
        })
    }
    
    
    function formatCompilerCode($currentChapter, $) {
        $currentChapter
            .find(`.lang-exec__${process.env.LANGUAGE}`)
            .map((index, element) => {
                const $preTagWrapper = $(element).parent()
                // Insert button runCode
                const $btnCompile = $(`<button data-js="compileCode">Rodar!</button>`)
                $preTagWrapper.before($btnCompile)
    
                // Convert highlithed compiler code to pure text
                const pureCompilerCode = $(element).text()
                $(element).html(pureCompilerCode)
    
                // Convert <pre> to <template>
                $preTagWrapper.replaceWith(
                    $('<template/>').html($preTagWrapper.html())
                );
            })
    }
    
    function generateFiles(content, path) {
        const buildDir = `./apostilas/${LANGUAGE}/build/html-builded`
        if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);
    
        fs.writeFile(path, content, function(err) {
            if(err) return console.log(err);
            console.log(`Capítulo: ${path}, criado com sucesso :)`)
        }); 
    }
}
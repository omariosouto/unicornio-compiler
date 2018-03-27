const fs = require('fs')
const buildedHtmlPath = './build/01-html/index.html'



fs.readFile(buildedHtmlPath, "utf8", function(err, data) {
    if (err) throw err;
    mapHtmlToInteractiveDoc(data)
});

// Isomorpich Code


const cheerio = require('cheerio')
process.env.LANGUAGE = 'java'

function mapHtmlToInteractiveDoc(html) {
    
    const $ = cheerio.load(html)

    $('.doc-article').map((index, element) => {
        let $currentChapter = $(element)
        formatCompilerCode($currentChapter, $)


        const chapterSlug = $currentChapter.find('.doc-nav-anchor').attr('name')
        generateFiles($currentChapter.html(), `./build/02-builded/${chapterSlug}.html`)
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
    fs.writeFile(path, content, function(err) {
        if(err) return console.log(err);
        console.log(`Capítulo: ${path}, criado com sucesso :)`)
    }); 
}
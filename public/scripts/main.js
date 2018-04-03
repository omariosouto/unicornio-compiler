import CompilerService from './compilers/sphereEngine/SphereEngineService.js'

const formCodigo = document.querySelector("#formCodigo")

formCodigo.addEventListener("submit", (event) => {
    event.preventDefault()
    const codigo = event.target.elements.codigo.value
    const  compilerService = new CompilerService("JAVA")

    // Código vem de um editor assim: https://codemirror.net/
    console.log('Enviando código... aguarde...')
    $compilerReturn.getDoc().setValue('Enviando código... aguarde...');
    compilerService
        .submit(codigo)
        .then(result => {
            $compilerReturn.getDoc().setValue(result.submissionResult);
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// Setup Btns
const btnsCompileCode = document.querySelectorAll('[data-js="compileCode"]')

btnsCompileCode.forEach((btn) => {
    btn.addEventListener('click', () => {
        const tpl = btn.nextSibling.content.cloneNode(true)
        
        $userEditor.getDoc().setValue(tpl.querySelector('code').innerText)
    })
})

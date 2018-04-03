function submit(submissionData) {
    const BFF_URL = "https://unicornio-online.herokuapp.com/compiler"
    return fetch(BFF_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
        if(response.status === 401) {
            throw new Error('Invalid access token')
        }
        throw new Error('Connection problem');
    })
}

function SphereEngineService(language){
    return {
        submit: code => submit({
            languageName: language,
            sourceCode: code
        })
    }
}

export default SphereEngineService
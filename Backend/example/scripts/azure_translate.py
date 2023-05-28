import requests, uuid, json, os

# Add your key and endpoint
key = os.environ.get("AZURE_TRANSLATE_KEY")
endpoint = "https://api.cognitive.microsofttranslator.com/translate"


params = {
    'api-version': '3.0',
    'from': 'en',
    'to': 'id'
}

headers = {
    'Ocp-Apim-Subscription-Key': key,
    'Content-type': 'application/json'
}

def translate(text):
    body = [{
        'text': text
    }]

    request = requests.post(endpoint, params=params, headers=headers, json=body)
    response = request.json()
    return response[0]["translations"][0]["text"]
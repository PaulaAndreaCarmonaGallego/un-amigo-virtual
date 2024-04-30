from flask import Flask, request
import requests
import json

app = Flask(__name__)

@app.route('/greet', methods=['GET'])
def greet():
    return "Hola mundo"

@app.route('/whatsapp', methods=['GET'])
def verifyToken():

    try:
        access_token="myaccesstoken"
        token=request.args.get('hub.verify_token')
        challenge=request.args.get('hub.challenge')

        if token == access_token:
            return challenge
        else:
            return "error",400
    except Exception as e:
            return "error",400


@app.route('/whatsapp', methods=['POST'])
def receiveMessage():
    try:
        body=request.get_json()
        entry=body['entry'][0]
        changes=entry['changes'][0]
        value=changes['value']
        messages=value['messages'][0]['text']['body']
        number=value['contacts'][0]['wa_id']
        
        print("Mensaje: ",messages)
        print("Numero: ",number)

        bodyAnswer=sendMessage(messages, number)
        sendToWhatsapp=whatsappService(bodyAnswer)

        if sendToWhatsapp:
            print("Mensaje enviado")
            return "success"
        else:
            print("Error al enviar mensaje")
            return "error",400
        return "EVENT_RECEIVED"
    except Exception as e:
        print(e)
        return "EVENT_RECEIVED_error"



def whatsappService(body):

    try:
        
        token="EAAzdHTepfDABOyrZA2v8mXATsZASv46JIym9ib0LOw55rBjOq2hGvZBzZAsoCBGDB4XlsJouj3748TqjaDqij77ZAWUYy1je6CYZA8GmVG6XRxAeGYOpYlPhtEFnXxbCfVCJqnH54mfZAYt33rsMc0R1Rb5tCPTEXdhl07TCmC2KrLw3M0lJbFC315bhVwGxwwL"
        apiUrl="https://graph.facebook.com/v18.0/301011976425692/messages"
        headers={
            "Content-Type":"application/json",
            "Authorization":f"Bearer {token}"
        }

        response = requests.post(apiUrl, data=json.dumps(body), headers=headers)

        if response.status_code == 200:
            return True
        else:
            print(json.dumps(body))
            return False
    except Exception as e:
        print('whatsappService')
        return False


def sendMessage(text, number):
   
    body={
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "body": "Esta es la respuesta a la pregunta "+text
        }
    }
    return body


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8501, debug=True)
from flask import Flask
import os
from twilio.rest import Client
from flask import request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest.api.v2010.account import message

app = Flask(__name__)

@app.route("/")
def inicio():
    test = os.environ.get("Test")
    return test

@app.route("/sms")
def sms():
    try:
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")
        message = client.messages \
            .create(
                body= contenido,
                from_='+18502795951',
                to= '+57' + (destino if destino else "")
            )
        print(message.sid)
        return "Mensaje enviado correctamente"
    except Exception as e:
        print (e)
        return "Error enviando el mensaje"

@app.route("/envio-correo")
def email():
    destino = request.args.get("correo_destino")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("contenido")

    message = Mail(
        from_email="Rentacar.gd4@gmail.com",
        to_emails=destino,
        subject=asunto,
        html_content=mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo electrónico enviado"
    except Exception as e:
        print(e)
        return "Error al enviar correo"

    if __name__ == '__main__':
        app.run()

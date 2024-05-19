from flask import Blueprint, request, jsonify
from src.services.greetingService import GreetingService

main = Blueprint('openai_blueprinter', __name__)

@main.route('/', methods=['GET'])
def getResponseOpenai():

    try:
        message = request.get_json()
        response = GreetingService.getResponseOpenai(message['user_greeting'])
        return response
    except Exception as e:
        print(type(e), e)
        return jsonify({"error": "error"})
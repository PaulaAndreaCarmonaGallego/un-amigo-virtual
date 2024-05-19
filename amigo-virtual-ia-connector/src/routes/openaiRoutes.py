from flask import Blueprint, request, jsonify
from src.services.openaiService import OpenaiService

main = Blueprint('openai_blueprinter', __name__)

@main.route('/', methods=['GET'])
def getResponseOpenai():

    try:
        message = request.get_json()
        response = OpenaiService.getResponseOpenai(message['user_content'])
        return response
    except Exception as e:
        print(type(e), e)
        return jsonify({"error": "error"})
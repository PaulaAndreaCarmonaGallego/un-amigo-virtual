from flask import Flask
from .routes import openaiRoutes

app = Flask(__name__)


def init_app():
    app.register_blueprint(openaiRoutes.main, url_prefix='/getopenai')
    return app
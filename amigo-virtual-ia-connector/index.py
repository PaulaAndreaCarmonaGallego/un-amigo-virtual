# from config import config
from src import init_app

# configuration = config['development']
app = init_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8501, debug=True)
import os
from dotenv import load_dotenv
from openai import OpenAI

client = OpenAI()
client.api_key = os.getenv('OPENAI_API_KEY')

# Consultar modelos
# models = openai.models.list()
# print(models)

class GreetingService():
        
    @classmethod
    def responseGreeting(cls, user_greeting):
        try:
            response = client.chat.completions.create(
                model='gpt-3.5-turbo-16k',
                messages=[
                    {
                        "role": "system", 
                        "content": "Responde el saludo como si fueras un joven entre 18 y 28 años, capaz de entender jerga colombiana."
                    },
                    {
                        "role": "user", 
                        "content": user_greeting
                    }
                ],
                n=1,
                temperature=0.7,
            )
            print(response.choices[0].message.content)
            return response.choices[0].message.content
        except Exception as e:
            print(type(e), e)
            return "error"
        

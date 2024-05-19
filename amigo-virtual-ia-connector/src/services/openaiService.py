import os
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI
import spacy


client = OpenAI()
client.api_key = os.getenv('OPENAI_API_KEY')
modelSpacy = spacy.load("es_core_news_md")
alertWords = ["suicidio", "suicida"]

# Consultar modelos
# models = openai.models.list()
# print(models)

class OpenaiService():

    @classmethod
    def getResponseOpenai(cls, user_content):
        try:
            response = client.chat.completions.create(
                model='gpt-4-turbo',
                messages=[
                    {
                        "role": "system", 
                        "content": "Eres un asistente especializado en atender problemas de salud mental."
                    },
                    {
                        "role": "user", 
                        "content": user_content
                    }
                ],
                n=1,
                temperature=0.7,
            )
            print(response.choices[0].message.content)
            
            alertMessage = cls.alertWords(user_content)

            relevance = cls.relevanceResponse(response.choices[0].message.content, user_content)
            if relevance:
                return response.choices[0].message.content
            else:
                return "RELEVANCE ERROR"
            
        except Exception as e:
            print(type(e), e)
            return "error"
        

    @classmethod
    def analyzeFeelings(cls, text):
        try:
            prompt = f"Analiza el sentimiento predominante en el siguiente texto: '{text}'. Considera el tono general de la discusión, la emoción transmitida por el lenguaje utilizado y el contexto en el que se expresan las palabras y frases. Indica si el sentimiento es generalmente positivo, negativo o neutral. El sentimiento predominante es: "
            response = client.sentiment_analysis(
                engine="gpt-4",
                data=prompt
            )
            return response
        except Exception as e:
            print(type(e), e)
            return "error"
        
    @classmethod
    def cosSimilarity(cls, text1, text2):
        try:
            response = modelSpacy(text1).similarity(modelSpacy(text2))
            superposition = np.dot(text1, text2)
            magnitude1 = np.linalg.norm(text1)
            magnitude2 = np.linalg.norm(text2)
            cosSim = superposition / (magnitude1 * magnitude2)
            return cosSim
        except Exception as e:
            print(type(e), e)
            return "error"
        
    @classmethod
    def relevanceResponse(cls, response, prompt, threshold=0.5):
        try:

            vectorizedPrompt = modelSpacy(prompt).vector
            vectorizedResponse = modelSpacy(response).vector
            similarity = cls.cosSimilarity(vectorizedPrompt, vectorizedResponse)

            return similarity >= threshold
        except Exception as e:
            print(type(e), e)
            return "error"
    
    @classmethod
    def alertWords(cls, text):
        try:
            token = modelSpacy(text)
            result = []
            for word in token:
                if word.lower() in alertWords:
                    result.append(word.text)
            return result
        except Exception as e:
            print(type(e), e)
            return "error"
        
         

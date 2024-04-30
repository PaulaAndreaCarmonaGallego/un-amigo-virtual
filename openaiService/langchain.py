from langchain.llms import OPENAI
from langchain.chains.question_answering import load_qa_chain

llm=OpenAI(model_name="text-davinci-003")
chain=load_qa_chain(llm)


response=chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

class RAGService:

    def __init__(self, llm, vectordb):
        self.llm = llm
        self.vectordb = vectordb

    def ask(self, question):

        retriever = self.vectordb.as_retriever(
            search_kwargs={"k":4}
        )

        docs = retriever.invoke(question)

        context = "\n\n".join(
            [doc.page_content for doc in docs]
        )

        prompt = ChatPromptTemplate.from_template(
        """
        Answer using only context.

        Context:
        {context}

        Question:
        {question}
        """
        )

        chain = (
            prompt
            | self.llm
            | StrOutputParser()
        )

        answer = chain.invoke({
            "context": context,
            "question": question
        })

        citations = []

        for doc in docs:
            citations.append({
                "source": doc.metadata.get(
                    "source",
                    "unknown"
                ),
                "page": doc.metadata.get(
                    "page",
                    "-"
                )
            })

        return {
            "answer": answer,
            "citations": citations
        }

    def _build_context(self, question: str):
        retriever = self.vectordb.as_retriever(
            search_kwargs={"k": 4}
        )
        docs = retriever.invoke(question)
        context = "\n\n".join([doc.page_content for doc in docs])
        return context, docs

    def stream_ask(self, question: str):
        context, _docs = self._build_context(question)

        prompt = ChatPromptTemplate.from_template(
            """
            Answer using only context.

            Context:
            {context}

            Question:
            {question}
            """
        )

        chain = prompt | self.llm | StrOutputParser()

        return chain.stream({
            "context": context,
            "question": question,
        })
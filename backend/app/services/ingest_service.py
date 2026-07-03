from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

class IngestService:

    def __init__(self, vectordb):
        self.vectordb = vectordb

    def ingest_pdf(self, filepath):

        loader = PyPDFLoader(filepath)

        docs = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

        chunks = splitter.split_documents(docs)

        self.vectordb.add_documents(chunks)

        return len(chunks)
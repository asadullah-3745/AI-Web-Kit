from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage

ROLE_MAP: dict[str, type[BaseMessage]] = {
    "user": HumanMessage,
    "assistant": AIMessage,
    "system": SystemMessage,
}


class ChatService:
    def __init__(self, llm):
        self.llm = llm

    def _to_langchain_messages(self, messages: list[dict]) -> list[BaseMessage]:
        lc_messages: list[BaseMessage] = []

        for message in messages:
            role = message.get("role")
            content = (message.get("content") or "").strip()

            if role not in ROLE_MAP or not content:
                continue

            lc_messages.append(ROLE_MAP[role](content=content))

        return lc_messages

    def stream_chat(self, messages: list[dict]):
        lc_messages = self._to_langchain_messages(messages)

        if not lc_messages:
            return

        for chunk in self.llm.stream(lc_messages):
            text = chunk.content
            if isinstance(text, str) and text:
                yield text

import { createContext, useContext, useState } from 'react';

const MessageContext = createContext<MessageContextData>(
  {} as MessageContextData
);

export interface Message {
  index: string;
  text: string;
  type: 'error' | 'success';
}

export interface MessageContextData {
  messages: Message[];
  sendError: (message: string) => void;
  sendSuccess: (message: string) => void;
}

export const MessageProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendError = (text: string) => {
    sendMessage(text, 'error');
  };

  const sendSuccess = (text: string) => {
    sendMessage(text, 'success');
  };

  const sendMessage = (text: string, type: 'error' | 'success') => {
    const newMessage: Message = {
      index: Math.random().toString(36).substring(2, 15),
      text,
      type,
    };

    setMessages([...messages, newMessage]);

    setTimeout(() => {
      setMessages([]);
    }, 4000);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        sendError,
        sendSuccess,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export function useMessageContext(): MessageContextData {
  return useContext(MessageContext);
}

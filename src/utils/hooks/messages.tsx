import { useState, useEffect } from 'react';
import { Message } from '../../types/message';

// In this file you'll find hooks designed to interact with the messages API

export const useGetMessages = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMessages(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const updateMessages = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMessages(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return { messages, isLoading, error, updateMessages };
};

export const useGetLastMessage = (url: string) => {
  const [lastMessage, setLastMessage] = useState<Message>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data: Message[] = await response.json();
        setLastMessage(data[data?.length - 1]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { lastMessage, isLoading, error };
};

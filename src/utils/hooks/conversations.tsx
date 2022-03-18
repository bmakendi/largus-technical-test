import { useState, useEffect } from 'react';
import { Conversation } from '../../types/conversation';

// In this file you'll find hooks designed to interact with the conversations API

export const useGetConversations = (url: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data: Conversation[] = await response.json();
        setConversations(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { conversations, isLoading, error };
};

export const useGetConversation = (url: string, id: number) => {
  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data: Conversation[] = await response.json();
        data.forEach((conv) => {
          if (conv.id === id) {
            setConversation(conv);
            return;
          }
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, id]);

  return { conversation, isLoading, error };
};

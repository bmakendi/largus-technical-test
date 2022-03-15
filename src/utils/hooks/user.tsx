import { useState, useEffect } from 'react';
import { User } from '../../types/user';

export const useGetUsers = (url: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
    setLoading(false);
  }, [url]);

  return { users, isLoading, error };
};

export const useGetUser = (url: string) => {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchData();
    setUserLoading(false);
  }, [url]);

  return { user, userLoading, error };
};

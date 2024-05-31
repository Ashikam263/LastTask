import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SomeProtectedComponent = () => {
  const { refreshAccessToken} = useAuth();
  // const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attempt to fetch some protected data
        const response = await fetch('http://localhost:8000/api/protected', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          // If unauthorized, attempt to refresh the token
          await refreshAccessToken();
          // Retry the request
          const retryResponse = await fetch('http://localhost:8000/api/protected', {
            method: 'GET',
            credentials: 'include',
          });
          if (!retryResponse.ok) throw new Error('Failed to fetch data');
          const data = await retryResponse.json();
          setData(data);
        } else if (!response.ok) {
          throw new Error('Failed to fetch data');
        } else {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [refreshAccessToken]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SomeProtectedComponent;

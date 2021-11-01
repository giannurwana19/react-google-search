import { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export default function ResultContextProvider({ children }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Programming Tutorial');

  const getResults = async type => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'x-user-agent': 'desktop',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': 'a269988f10msh5ca67b7da333353p1fc485jsn7a3241781381',
      },
    });

    const data = await response.json();

    if (type.includes('/news')) {
      setResults(data.entries);
    } else if (type.includes('/images')) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ results, searchTerm, isLoading, setSearchTerm, getResults }}>
      {children}
    </ResultContext.Provider>
  );
}

export const useResultContext = () => useContext(ResultContext);

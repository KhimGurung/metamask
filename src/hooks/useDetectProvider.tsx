import { useState, useEffect } from 'react';

const useDetectProvider = () =>  {
  const [provider, setProvider] = useState<string>("");
  
  useEffect(() => {
    const provider = window.ethereum;
    setProvider(() => provider);
  }, [])

  return provider;
}

export default useDetectProvider;
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import './App.css';
import dice from './assets/icon-dice.svg';
import divMobile from './assets/pattern-divider-mobile.svg';
import divDesktop from './assets/pattern-divider-desktop.svg';

const queryClient = new QueryClient();

function AdviceGenerator() {
  const { isLoading, error, data, refetch } = useQuery('advice', async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json().then((res) => res.slip); 
  }, {
    refetchOnWindowFocus: false,
  });

  function handleClick() {
    refetch();
  }

  return (
    <main>
      {error && <p>An error has occurred: {error.message}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      <div className="container">
        <h1>Advice #{data.id}</h1>
        <p>"{data.advice}"</p>
        <picture>
          <source media="(min-width:768px)" srcSet={divDesktop} />
          <img src={divMobile} alt="" />
        </picture>
        <button type="button" aria-label="get new advice" onClick={handleClick}><img src={dice} alt="" /></button>
      </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdviceGenerator />
    </QueryClientProvider>
  );
}
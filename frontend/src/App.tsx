import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookCards from "@/components/book_cards/BookCards";
import {BookGenre} from "@/types/bookGenre.ts";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <BookCards title={"The Great Gatsby"}
                 author={"F. Scott Fitzgerald"}
                 genre={BookGenre.FANTASIA}
                 synopsis={"A story about the Jazz Age in the United States, " +
                     "focusing on the mysterious Jay Gatsby and his obsession with Daisy Buchanan."}
                 isFavorite={true}>
      </BookCards>
    </>
  )
}

export default App

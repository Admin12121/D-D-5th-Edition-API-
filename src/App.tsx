import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { getAllSpells, fetchSpellData, Spell } from './Components/SpellList';
import { motion } from "framer-motion";
import Navbar from './Components/Navbar';

const App: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loadedSpellCount, setLoadedSpellCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const constraintsRef = useRef(null);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const spellData = await getAllSpells();
        setSpells(spellData);
        setLoading(false);
        setLoadedSpellCount(20); // Load initial 20 spells
      } catch (error) {
        console.error('Error fetching spells:', error);
      }
    };
    fetchSpells();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName("card");
      for (const card of cards) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };

    document.getElementById("cards")?.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.getElementById("cards")?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom && loadedSpellCount < spells.length) {
        setLoadedSpellCount(prevCount => prevCount + 20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadedSpellCount, spells]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spellName = entry.target.getAttribute('data-spell-name');
          if (spellName && !data[spellName]) {
            fetchSpellData(spells.find(spell => spell.name === spellName)?.url || '').then(spellData => {
              setData(prevData => ({
                ...prevData,
                [spellName]: spellData
              }));
            });
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    document.querySelectorAll('.card').forEach(card => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [data, spells]);
  const addToFavorites = (spellName: string) => {
    if (!favorites.includes(spellName)) {
      setFavorites(prevFavorites => {
        const updatedFavorites = [...prevFavorites, spellName];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    }
    else{
      removeFromFavorites(spellName);
    }
  };
  
  const removeFromFavorites = (spellName: string) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.filter(name => name !== spellName);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  
  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState); 
  };
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  return (
    <div className="App" ref={constraintsRef}>
    <Navbar favorites={favorites} toggleFavorites={toggleFavorites} searchQuery={searchQuery} handleSearchInputChange={handleSearchInputChange}  clearSearch={clearSearch}/>
     <h1>{showFavorites ? "Favourite Spell Cards" : "Dungeons and Dragons Spells"}</h1>
    {loading && (
      <span className="loading">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </span>
    )}
    <div id="cards">
    {(showFavorites ? spells.filter(spell => favorites.includes(spell.name)) : spells) // Filter spells based on favourite
  .filter(spell => spell.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter spells based on search query
  .slice(0, loadedSpellCount)
  .map(spell => (
    <motion.div key={spell.name} className="card" draggable="true" data-spell-name={spell.name}>
      <span className='SavePOp' onClick={() => addToFavorites(spell.name)}> {/*Add to favourate*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none">
                <path d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z" stroke={`${favorites.includes(spell.name) ? 'orange' : '#fff'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke={`${favorites.includes(spell.name) ? 'orange' : '#fff'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke={`${favorites.includes(spell.name) ? 'orange' : '#fff'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
      </span>
      <div className="card-border"></div>
      <div className="card-content">
        <span className='header'>
          <h1>{spell.name}</h1>
          {data[spell.name] && (
            <>
              {data[spell.name].level > 0 && `Level ${data[spell.name].level} `}
              {data[spell.name].school.name}
              {data[spell.name].level === 0 && " cantrip"}
            </>
          )}
        </span>
        <div className="stats" style={{ display: `${data[spell.name] ? "grid" : "flex"}` }}>
          {/* Placeholder for spell data, actual data will be fetched when this card becomes visible */}
          {data[spell.name] ? data[spell.name] && (
            <>
              <p>
                <strong>Casting Time</strong>
                {data[spell.name].casting_time}
              </p>
              <p>
                <strong>Range</strong>
                {data[spell.name].range}
              </p>
              <p>
                <strong>Components</strong>
                {data[spell.name].components.join(", ")}
              </p>
              <p>
                <strong>Duration</strong>
                {data[spell.name].duration}
              </p>
            </>
          ) :
            <>
              <div className="load">
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            </>}
        </div>
      </div>
    </motion.div>
  ))}
    </div>
  </div>
  );
};

export default App;


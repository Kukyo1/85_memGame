import { useEffect, useRef, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImg = [
  {"src" : "/img/circle.png"},
  {"src" : "/img/cross.png"},
  {"src" : "/img/pentagon.png"},
  {"src" : "/img/ring.png"},
  {"src" : "/img/square.png"},
  {"src" : "/img/triangle.png"},
]

function App() {

  const [cards, setCards] = useState([]);
  const [enable, setEnable] = useState(false);
  const [timer, setTimer] = useState(5);
  const [lives, setLives] = useState(3);
  let numOfCards = useRef(1);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prev=>{
          return prev.map((card)=>{
            if(card.src === choiceTwo.src){
              return {...card, matched: true};
            }
            else{
              return card;
            }
          })
        })
      }
      else{
        setLives(p=>p-1);
      }
      setTimeout(()=>resetTurn(), 700)
    }
    if(lives===0){
      if(alert("You loose")){
        window.location.reload();
      }
      else{
        window.location.reload();
      }
    }
    if(checkComplet()){
      numOfCards.current = numOfCards.current+1;
      setTimer(5);
      shuffleCards();
    }
  }, [choiceOne, choiceTwo])

  useEffect(()=>{
    if(!enable) return;
    const i = setInterval(()=>{
      setTimer((p)=>Math.max(p-1, 0));
    }, 1000);
    return () => clearInterval(i);
  }, [enable]);

  const checkComplet = () =>{
    if(cards.length===0){
      return false;
    }
    let flag = true;
    cards.map((card)=>{
      if(!card.matched){
        flag = false;
      }
    })
    return flag;
  }

  const resetTurn = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  const shuffleCards = () =>{
    setEnable(true);
    console.log(numOfCards);
    let shuffledCards = [...cardImg.slice(0, numOfCards.current+1), ...cardImg.slice(0,numOfCards.current+1)].sort(()=>Math.random() - 0.5)
      .map((card)=>( {...card, id: Math.random(), matched: false, fmatch: true} ));
    console.log(shuffledCards.length);
    setCards(shuffledCards);
    setTimeout(()=>{
      setCards((prev)=>{
        return prev.map((card)=>({...card, fmatch:false}))
      });
    }, 5000);

    setChoiceOne(null);
    setChoiceTwo(null);
  }
  return (
    <div className="App">
      <div className="title">Memory Game</div>
      <button onClick={shuffleCards}>Start</button>
      <p className='timer'>{timer}</p>
      <p className='lives'>Lives: {lives}</p>
      <div className="card-grid" style={{
        gridTemplateColumns: `repeat(${numOfCards.current+1}, 200px)`
      }}>
        {cards.map((card)=>(
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched || card.fmatch}
          disabled={disabled}></SingleCard>
        ))}
      </div>
    </div>
  );
}

export default App;

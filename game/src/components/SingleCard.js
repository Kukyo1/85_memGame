import './SingleCard.css'

const SingleCard = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = ()=>{
        if(!disabled){
            handleChoice(card);
        }
    }
    return (
    <div className="card">
        <div>
          {flipped && <img className='front' src={card.src} alt='card front'></img>}
          <img onClick={handleClick} className='back' src='/img/cover.png' alt='card back'></img>
        </div>
    </div>
    );
}
 
export default SingleCard;
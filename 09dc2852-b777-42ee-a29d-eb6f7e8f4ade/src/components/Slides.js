import React, {useState} from 'react';

function Slides({slides}) {
    const [ currentSlide, setCurrentSlide ] = useState(0);

    const prevSlide = () => {
        if(currentSlide - 1 >= 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }

    const nextSlide = () => {
        if(currentSlide + 1 < slides.length) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" disabled={currentSlide === 0} onClick={() => setCurrentSlide(0)}>Restart</button>
                <button data-testid="button-prev" className="small" disabled={currentSlide === 0} onClick={prevSlide}>Prev</button>
                <button data-testid="button-next" className="small" disabled={(currentSlide+1) === slides.length} onClick={nextSlide}>Next</button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slides[currentSlide].title}</h1>
                <p data-testid="text">{slides[currentSlide].text}</p>
            </div>
        </div>
    );

}

export default Slides;

import { Carousel } from 'react-bootstrap'
import "./Homepage.css"
import gwatchLogo from "../assets/Images/gwatchlogo.png"
import gwatchSlide1 from "../assets/Images/homepage/gwatchslide1.png"

const slides = [
    gwatchSlide1,
    gwatchLogo
]

export function Homepage(){
    return (
        <div >
          <div className="homepage-header">
            <h1>Welcome to Georgia Watch</h1>
            <p>Protecting consumers since 2002</p>
            </div>
            <Carousel controls={true} indicators={false} interval={3000}>
                {slides.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt={`Georgia Watch Images ${index + 1}`}
                            style={{
                                marginTop: '50px', 
                                marginBottom: '50px', 
                                height: '50vw', 
                                objectFit: 'cover'
                            }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};
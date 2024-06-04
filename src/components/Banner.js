import { useState, useEffect } from "react";
// Need to research these elements
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

/* 
    NOTES / New Concepts: 

    Container, row, and col styling is preset in bootstrap
    ArrowRightCircle is a react bootstrap icon

    Track Visibility - component from react-on-screen package, monitors when component is on and screen and 
        can trigger actions accordingly
*/

export const Banner = () => {
  // Determines which word is displayed in rotation
  const [loopNum, setLoopNum] = useState(0);
  // Is word being typed, or deleted? 
  const [isDeleting, setIsDeleting] = useState(false);
  // How much of word is being typed/ displayed
  const [text, setText] = useState('');
  // Time interval between each letter typed
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  // List of words being rotated
  const toRotate = [ "Technologist", "Researcher", "Digital Philosopher" ];
  // Time interval between each word being typed
  const period = 2000;

  // Creates function that handles typing/ deleting

  // Need to research setInterval / clearInterval
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  // Overstand this function
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          {/* <Col xs={12} md={6} xl={7}> */}
            <TrackVisibility>
              {({ isVisible }) =>
              <div style={{"text-align": "center"}}className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Universe</span>
                <h1>{`Greetings, I'm `} <span style={{color: '#db8305'}}>{`Steve`}</span>< br/><span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Technologist", "Engineer", "Digital Philosopher" ]'><span className="wrap">{text}</span></span></h1>
                  <p>The Digital Evolution is amongst us. As societal communication increases at warp speeds, industries are now converging; suggesting that we can finally tackle dire humane needs. I'm here to build products and ecosystems that enhances such great work. Check out what I have to offer here!</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          {/* </Col> */}
          {/* <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col> */}
        </Row>
      </Container>
    </section>
  )
}

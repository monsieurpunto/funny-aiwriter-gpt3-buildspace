import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';


const Home = () => {
  const [userInput,setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 AI Writer | Puntoriza</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AI Funny Jokes Writer using GPT3</h1>
          </div>
          <div className="header-subtitle">
            <h2>Simply write the theme of the joke and the AI will do rest. </h2>
          </div>
          <div className="prompt-container">
          <textarea 
            placeholder="type the theme here. example: Fish, Car, Anime" 
            lassName="prompt-box" 
            value={userInput}
            onChange={onUserChangedText}
          />
           <div className="prompt-buttons">
            <a 
              className={isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick={callGenerateEndpoint}
              
              >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
          
        </div>
        <div className="header-subtitle">
            <h2>Developed by Puntoriza</h2>
          </div>
        </div>
      </div>
      {/*<div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        
        </a>
      </div>
    */}
    
    </div>
  );
};

export default Home;

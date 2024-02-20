import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
// import { i } from "vite/dist/node/types.d-jgA8ss1A";
// import { useCallback } from "react";
// import { useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(8);
  const [char, setChar] = useState(false);
  const [num, setNum] = useState(false);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (char) str += ":!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    if (num) str += "0123456789";

    for (let i = 1; i <= range; i++) {
      let random = parseInt(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }

    setPassword(pass);

    console.log(pass);
  }, [char, num, range, setPassword]);

  const copyText = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password);
  } , [password]) 
   
  

  const passRef = useRef(null)
  useEffect(() => {
    passGenerator();
  }, [char, num, range]);

  return (
    <>
      <div className=" text-white bg-blue-300 w-full font-sans h-screen flex flex-col justify-center items-center gap-4">
        <div className=" bg-black rounded-3xl p-20 py-28 gap-5  shadow-black">
          <div className="text-center text-4xl font-semibold mb-8">
            Password Generator
          </div>
          <div className="gap-4 flex flex-row justify-center items-center">
            <div>
              <input
                className="text-black border-black h-10 pl-3 w-96 rounded-lg border-2"
                type="text"
                value={password}
                ref={passRef}
              />
            </div>
            <div>
              <button
                onClick={copyText}
                className=" bg-blue-500 p-2 rounded-md w-[6rem] font-sans text-white"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="gap-4 flex justify-around items-center mt-8 flex-wrap">
            <div>
              <input
                type="range"
                min={0}
                max={100}
                value={range}
                onChange={(e) => setRange(e.target.value)}
              />

              <label htmlFor="" className="ml-2 font-semibold text-xl">
                {range}
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                defaultChecked={char}
                onChange={() => {
                  setChar((prev) => !prev);
                  console.log(char);
                }}
              />
              <label htmlFor="" className="ml-2 text-lg">
                Characters
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={num}
                onChange={() => {
                  setNum((prev) => !prev);
                  console.log(num);
                }}
              />
              <label className="ml-2 text-lg" htmlFor="">
                Numbers
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

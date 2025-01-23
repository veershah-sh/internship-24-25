import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let [password, setPassword] = useState("");
  let [length, setLength] = useState(8);
  let [isNumberAllowed, setIsNumberAllowed] = useState(false);
  let [isCharAllowed, setIsCharAllowed] = useState(false);
  let [res, setRes] = useState("")

  const pass_ref = useRef(null)

  function generatePassword (){
    let pass = ""
    let pass_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (isNumberAllowed) pass_string += "0123456789"
    
    if(isCharAllowed) pass_string += "@#$%^&*"
    
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * pass_string.length + 1) 
      pass += pass_string.charAt(char)
    }
    console.log(pass);
    res = ""
    setPassword(pass)
    setRes(res)

  }

  let copyToCB = useCallback(() => {
    // console.log(pass_ref.current.value);
    pass_ref.current?.select();
    window.navigator.clipboard.writeText(password)
    console.log("password copied!");
    res = "password copied!";
    setRes(res)
    
  }, [password])

  const genPass = useCallback(generatePassword , [length, isCharAllowed, isNumberAllowed, setPassword])

  useEffect(() => {
    genPass()
  }, [length, isCharAllowed, isNumberAllowed])


  return (
    <div className="bg-gray-200 p-6 m-4">
      <h1 className="text-3xl font-bold underline text-center">Password Generator</h1>
      <div className="bg-white mt-4 rounded-lg p-4">
        <div className="w-full flex">
        <input 
          type="text"
          value={password}
          ref={pass_ref}
          className="p-2 border-1 w-120"
          placeholder="Password..."
          readOnly
         />
         <button className="bg-amber-400 p-2 w-20" onClick={copyToCB}>Copy</button>
        </div>
        <div className="mt-4 ">
          <input type="range" 
          min={8} 
          max={20} 
          value={length}
          onChange={(e) => {setLength(e.target.value)}}/>
          <br/>
          <label htmlFor="Length">Length: {length}</label>
        </div>
        <div className="mt-4">
          <input 
            type="checkbox"
            defaultChecked={isNumberAllowed}
            onChange={() => setIsNumberAllowed((prev) => !prev)} 
          />
          <label htmlFor="Numbers"> Numbers</label>
        </div>
        <div className="mt-4">
          <input 
            type="checkbox" 
            defaultChecked={isCharAllowed}
            onChange={() => setIsCharAllowed((prev) => !prev)} 
          />
          <label htmlFor="Characters"> Characters</label>
        </div>
        <p>{res}</p>
      </div>
      
    </div>
  );
}

export default App;

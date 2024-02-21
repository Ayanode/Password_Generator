import React, { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(0);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const [numberAllowed, setNumberAllowed] = useState(false);
  const [copied, setCopied] = useState(false); // State to manage the copied status

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current.select();
    document.execCommand("copy");
    setCopied(true); // Set copied to true when the button is clicked
    setTimeout(() => setCopied(false), 2000); // Reset copied to false after 2 seconds
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, setPassword]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className= "bg-gray-200 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl  text-center mb-4">Password Generator</h1>
        <div className="relative mb-9">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 bg-gray-300 rounded-lg text-center focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoClipboard}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              copied ? "bg-green-600" : "hover:bg-blue-700"
            }`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm">Length: {length}</label>
          <input
            type="range"
            min="8"
            max="128"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full cursor-pointer"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label className="ml-2">Include Numbers</label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label className="ml-2">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

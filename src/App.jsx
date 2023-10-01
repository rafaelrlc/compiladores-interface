import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("enviando");
    const response = await fetch(
      "http://127.0.0.1:5000/helloworld",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: message,
        }),
      }
    );
    const data = await response.json();
    console.log(data.codigo);
    setMessage(data.codigo);
    setResponse(data.codigo);
  };

  const clearHandler = () => {
    setMessage("");
    setResponse("");
    setShowClearButton(false);
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    setShowClearButton(newMessage.trim() !== "");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const text = await file.text();
      setMessage(text);
      setShowClearButton(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-black text-3xl py-7 px-10 mt-5 bg-gray-100 rounded-xl">
        Analisador Léxico
      </h1>
      <form className="flex flex-col gap-10" onSubmit={submitHandler}>
        <div className="flex gap-10">
          <div>
            <div className="flex gap-1 justify-center ">
              <label
                htmlFor="fileInput"
                className="block mb-2 text-xl font-medium text-gray-900 text-center"
              >
                Entrada
              </label>
              <label
                htmlFor="fileInput"
                className="relative  cursor-pointer bg-white rounded-md font-medium text-blue-700 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>
                  <AiOutlineCloudUpload size={28} />
                </span>
                <input
                  id="fileInput"
                  name="fileInput"
                  type="file"
                  accept=".txt"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={handleMessageChange}
              className="block p-2.5  h-[65vh] w-[40vw] text-xl text-gray-900 bg-gray-200 rounded-lg border border-gray-300 resize-none "
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="response"
              className="block mb-2 text-xl font-medium text-gray-900 text-center"
            >
              Resultado
            </label>
            <div
              id="response"
              className="block p-2.5 h-[65vh] w-[40vw] overflow-y-auto text-xl text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              style={{ whiteSpace: "pre" }} // Add this line to preserve spaces and line breaks
            >
              {response}
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="text-white w-full text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
          >
            Enviar
          </button>
          {showClearButton && (
            <button
              type="button"
              onClick={clearHandler}
              className="text-white w-full text-xl bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
            >
              Limpar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;

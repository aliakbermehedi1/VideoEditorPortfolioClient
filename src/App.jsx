import React, { useState } from "react";
// import "../src/javascriptPrac/01-Practice";
// import "../src/javascriptPrac/02-Practice";
// import "../src/javascriptPrac/03-Practice";
// import "../src/javascriptPrac/04-Practice";
// import "../src/javascriptPrac/05-Practice";
// import "../src/javascriptPrac/06-Practice";
// import "../src/javascriptPrac/07-Practice";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-200 h-20 px-4 flex flex-col items-center justify-center">
        <h1>Hello, World!</h1>
        <p>Welcome to my React application.</p>
      </div>

      {/* START */}
      <div className="flex gap-2">
        <div className="bg-amber-200 h-40 flex flex-col font-bold gap-4  items-center justify-center mt-10">
          <div>
            <p className="bg-white rounded-full p-2">{count}</p>
          </div>
          <div className="flex justify-center items-center gap-4 mx-8">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-green-600 px-3 py-1 text-white font-bold rounded-full cursor-pointer"
            >
              Increment
            </button>

            <button
              onClick={() => setCount((prev) => prev - 1)}
              className="bg-red-600 px-3 py-1 text-white font-bold rounded-full cursor-pointer"
            >
              Decrement
            </button>

            <button
              onClick={() => setCount(0)}
              className="bg-red-600 px-3 py-1 text-white font-bold rounded-full cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {/* END */}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react'


function add(numberes) {

    if(numberes.trim() === "") return 0;

    const numbers = numberes.split(",").map((num) => parseInt(num));
    let sum = 0;
    for(let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

export default function Home() {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState(null);


    useEffect(() => {
        setOutput(null)
    }, [input])


    const handleCalculate = () => {
        setOutput(add(input));
    }

    return (
        <>
           <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="bg-white p-16 rounded-3xl shadow-2xl w-full max-w-2xl transition-all duration-300">
                <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800">
                    String Calculator
                </h1>
                
                <div className="flex gap-6">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter something..."
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-blue-500 transition-all text-lg"
                    />
                    <button
                        onClick={handleCalculate}
                        className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-lg"
                    >
                        Calculate
                    </button>
                </div>

                <div className={`mt-10 p-6 rounded-xl border transition-all duration-300 ${
                    (output !== null) ? "bg-green-50 border-green-400" : "bg-gray-50 border-gray-200"
                } min-h-[120px] flex items-center justify-center`}>
                    {(output !== null) && <p className="text-green-700 text-xl font-semibold">{output}</p>}
                </div>
            </div>
        </div>
        </>
    )
}



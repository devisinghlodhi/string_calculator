import React, { useState, useEffect } from 'react'


function add(numbers) {

    if(numbers.trim() === "") return 0;

    let delimiters = ['\n'];

    if (numbers.startsWith("//")) {
        const newlineIndex = numbers.indexOf("\n");
        if (newlineIndex !== -1) {
            delimiters = [numbers.slice(2, newlineIndex)];
            numbers = numbers.slice(newlineIndex + 1);
        }
    }

    for (let delimiter of delimiters) {
        while (numbers.includes(delimiter)) {
            numbers = numbers.split(delimiter).join(",");
        }
    }

    const numArray = numbers.split(",").map(n => n.trim()).filter(n => n !== '');

    const negatives = [];
    let sum = 0;

    for (let n of numArray) {
        const num = parseInt(n);
        if (!isNaN(num)) {
            if (num < 0) {
                negatives.push(num);
            }
            sum += num;
        }
    }

    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
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
                    <textarea
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



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
        try {
            const result = add(input);    
            setOutput({type: "success", message: result});
        } catch (error) {
            console.log(error.message);
            setOutput({type: "error", message: error.message});
        }
        
        
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
                        className=" max-h-16 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-lg"
                    >
                        Calculate
                    </button>
                </div>

                <div 
                    className={`overflow-auto mt-8 p-6 rounded-xl border transition-all duration-300 min-h-[180px] max-h-[400px] w-full ${
                        output
                            ? output.type === "success"
                                ? "bg-green-50 border-green-400"
                                : "bg-red-50 border-red-400"
                            : "bg-gray-50 border-gray-200"
                    }`}
                >
                    {output && (
                        <p className={`${output.type === "success" ? "text-green-700" : "text-red-700"} text-lg md:text-xl font-semibold whitespace-pre-wrap`}>
                            {output.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}



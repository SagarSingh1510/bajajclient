import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async () => {
        try {
            // Parsing the input JSON
            const parsedInput = JSON.parse(jsonInput);
            console.log('Parsed Input:', parsedInput);

            // Making the POST request to the backend
            const response = await fetch('https://bajajserver-roan.vercel.app/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: parsedInput.data })
            });

            // Parsing the JSON response from the backend
            const data = await response.json();
            console.log('Response Data:', data);

            // Setting the response data to state
            setResponseData(data);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request. Please check your input.');
        }
    };

    const handleFilterChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedFilters(value);
    };

    const filteredResponse = () => {
        if (!responseData) return null;

        // Filtering the response data based on the selected filters
        let result = {};
        selectedFilters.forEach((filter) => {
            result[filter] = responseData[filter];
        });
        return result;
    };

    return (
        <div className="App">
            {/* Displaying the roll number or a placeholder */}
            <h1>{responseData ? responseData.roll_number : '21BCI0065'}</h1>

            {/* JSON input textarea */}
            <textarea
                rows="5"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON here..."
            />

            {/* Submit button to trigger the handleSubmit function */}
            <button onClick={handleSubmit}>Submit</button>

            {/* If response data is available, display the filters and the filtered response */}
            {responseData && (
                <>
                    {/* Multi-select dropdown to choose which parts of the response to display */}
                    <select multiple onChange={handleFilterChange}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">
                            Highest Lowercase Alphabet
                        </option>
                    </select>

                    {/* Displaying the filtered response */}
                    <div>
                        <h2>Filtered Response</h2>
                        <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
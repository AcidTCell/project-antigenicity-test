document.getElementById('analyzeButton').addEventListener('click', analyzeData);

function analyzeData() {
    const probableAntigensData = document.getElementById('probableAntigensInput').value.trim();
    const sequencesData = document.getElementById('sequencesInput').value.trim();

    // Function to extract probable antigens from the first input
    function extractProbableAntigens(data) {
        const probableAntigens = [];
        const lines = data.split('\n');
        lines.forEach(line => {
            const match = line.match(/^>(\d+)\s+Overall Protective Antigen Prediction = ([\d.-]+) \( Probable ANTIGEN \)/);
            if (match) {
                probableAntigens.push(match[1]);
            }
        });
        return probableAntigens;
    }

    // Function to extract sequences from the second input based on probable antigens
    function extractSequences(data, probableAntigens) {
        const sequences = {};
        let key = '';
        let sequence = '';
        const lines = data.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('>')) {
                if (key && sequence && probableAntigens.includes(key)) {
                    sequences[key] = sequence;
                    sequence = '';
                }
                key = line.substring(1).trim();
            } else if (line !== '') {
                sequence = line;
            }
        });
        // Store the last sequence
        if (key && sequence && probableAntigens.includes(key)) {
            sequences[key] = sequence;
        }
        return sequences;
    }

    // Extract probable antigens and sequences
    const probableAntigens = extractProbableAntigens(probableAntigensData);
    const sequences = extractSequences(sequencesData, probableAntigens);

    // Display the sequences of probable antigens
    let outputHTML = '';
if (Object.keys(sequences).length > 0) {
    outputHTML += '<h2>Sequences of Probable Antigens:</h2>';
    outputHTML += '<table>';
    outputHTML += '<tr><th>Probable Antigen</th><th>Sequence</th></tr>';
    Object.entries(sequences).forEach(([key, sequence]) => {
        outputHTML += `<tr><td>${key}</td><td>${sequence}</td></tr>`;
    });
    outputHTML += '</table>';
} else {
    outputHTML = 'No sequences found for probable antigens.';
}

    document.getElementById('results').innerHTML = outputHTML;
}
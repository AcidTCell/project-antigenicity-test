function analyzeData() {
    const data = document.getElementById('dataInput').value.trim();

    // Split data into sections based on major groups (Nonstructural, GII, GIV, etc.)
    const sections = data.split(/\n(?=[A-Z]{2,})/);

    let outputHTML = '';

    sections.forEach(section => {
        const lines = section.split('\n');
        const majorGroupName = lines.shift().trim();
        const antigenLines = lines.filter(line => line.includes("Probable ANTIGEN"));

        if (antigenLines.length > 0) {
            outputHTML += `<h2>${majorGroupName}</h2>`;
            const antigensHTML = antigenLines.map(line => `<tr><td>${line}</td></tr>`).join('');
            outputHTML += `<table>
                                <thead>
                                    <tr>
                                        <th>Antigen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${antigensHTML}
                                </tbody>
                            </table>`;
        }
    });

    document.getElementById('results').innerHTML = outputHTML;
}
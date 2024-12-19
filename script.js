document.getElementById('sequenceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const N = parseInt(document.getElementById('numberInput').value);
    const output = document.getElementById('output');
    output.textContent = '';

    const apiUrl = 'https://api.prod.jcloudify.com/whoami';

    for (let i = 1; i <= N; i++) {
        try {
            const response = await fetch(apiUrl);

            if (response.status === 403) {
                output.textContent += `${i}. Forbidden\n`;
            } else if (response.status === 200) {
                output.textContent += `${i}. OK\n`;
            } else if (response.status === 429 || response.status === 401) {
                alert('Captcha required! Solve the captcha to continue.');
                await new Promise(resolve => setTimeout(resolve, 5000));
                output.textContent += `${i}. Captcha Resolved\n`;
            } else {
                output.textContent += `${i}. Error: ${response.status}\n`;
            }
        } catch (error) {
            output.textContent += `${i}. Request failed\n`;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});
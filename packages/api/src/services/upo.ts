import fs from 'fs';

const API_URL = process.env.UPO_API as string;
const TOKEN = process.env.UPO_TOKEN as string;

const sendDoc = async (file: any) => {
    // Create a FormData object and append the file to it
    const formData = new FormData();
    console.log('file');
    console.log(file);

    let buffer = fs.readFileSync(file.filepath);
    let blob = new Blob([buffer]);

    formData.append('file', blob);
    formData.append('ip', '');
    formData.append('user_email', '');
    formData.append('metadata_value', '');

    // try {
    // Make a POST request to upload the file
    console.log(formData);
    console.log(API_URL);
    console.log(TOKEN);

    const res = await fetch(`${API_URL}/upload_pdf`, {
        method: 'POST', // Specify the HTTP method
        body: formData, // Set the FormData object as the request body
        headers: {
            'X-API-KEY': TOKEN
        }
    });

    console.log(res);

    // Check if the response is ok (status code is in the range 200-299)
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }

    // Parse the JSON response if the upload is successful
    const data = await res.json();
    return data;
    // } catch (error) {
    //     // Handle any errors that occurred during the fetch
    //     console.error('File upload failed:', error);
    //     throw error;
    // }
};

const upoService = { sendDoc };

export default upoService;

import fs from 'fs';

const API_URL = process.env.UPO_API as string;
const TOKEN = process.env.UPO_TOKEN as string;

type SendDocFields = {
    file: any;
    ip: string;
    email: string;
    metadata: any;
};

const sendDoc = async (fields: SendDocFields) => {
    // Create a FormData object and append the file to it
    const formData = new FormData();
    console.log('file');
    console.log(fields.file);

    let buffer = fs.readFileSync(fields.file.filepath);
    let blob = new Blob([buffer]);

    formData.append('file', blob, fields.file.originalFilename);
    formData.append('ip', fields.ip);
    formData.append('user_email', fields.email);
    formData.append('metadata_value', fields.metadata);

    // try {
    // Make a POST request to upload the file
    console.log(formData.get('file'));
    console.log(formData.get('ip'));
    console.log(formData.get('user_email'));
    console.log(formData.get('metadata_value'));
    console.log(API_URL);
    console.log(TOKEN);

    const res = await fetch(`${API_URL}/upload_pdf`, {
        method: 'POST', // Specify the HTTP method
        body: formData, // Set the FormData object as the request body
        headers: {
            'x-api-key': TOKEN
        }
    });

    // Check if the response is ok (status code is in the range 200-299)
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }

    // Parse the JSON response if the upload is successful
    const data = await res.json();
    console.log(data);

    return { requestID: data.request_id };
    // } catch (error) {
    //     // Handle any errors that occurred during the fetch
    //     console.error('File upload failed:', error);
    //     throw error;
    // }
};

const upoService = { sendDoc };

export default upoService;

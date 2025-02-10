import fs from 'fs';
import archiver from 'archiver';
import { Readable } from 'stream';

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

// Polling function with a long timeout and retry logic
async function pollApiForResult(analysisId: string, interval = 30000, timeout = 60 * 60 * 1000) {
    const startTime = Date.now();

    let timeoutId: any;

    return new Promise((resolve, reject) => {
        const poll = async () => {
            console.log('polling ' + analysisId);

            try {
                const params = {
                    id_request: analysisId,
                    ip: '1.1.1.1'
                };
                const queryString = new URLSearchParams(params).toString();
                const urlString = `${API_URL}/get_document_affinities?${queryString}`;
                console.log(urlString);

                const res = await fetch(urlString, {
                    headers: {
                        'x-api-key': TOKEN
                    }
                });

                const data = await res.json();
                console.log(data);

                // Check if the API indicates that the result is ready
                if (data.status === 'finished') {
                    clearTimeout(timeoutId);
                    return resolve(data.document_affinities);
                } else {
                    // Check if the timeout has been exceeded
                    if (Date.now() - startTime >= timeout) {
                        return reject(new Error('Polling timeout exceeded.'));
                    }

                    // Poll again after the specified interval
                    timeoutId = setTimeout(poll, interval);
                }
            } catch (error) {
                clearTimeout(timeoutId);
                // Handle transient network errors by retrying
                if (Date.now() - startTime >= timeout) {
                    return reject(new Error(`Polling failed: ${error}`));
                }
                console.error(`Error encountered, retrying: ${error}`);
                timeoutId = setTimeout(poll, interval);
            }
        };

        // Start the first poll
        poll();
    });
}

const downloadCSVDocs = async (analysisId: string) => {
    const params = {
        id_request: analysisId,
        ip: '1.1.1.1'
    };
    const queryString = new URLSearchParams(params).toString();
    const urls = [
        `${API_URL}/get_affinity_table_csv?${queryString}`,
        `${API_URL}/get_document_affinities_csv?${queryString}` // Segundo endpoint
    ];

    const zip = archiver('zip', { zlib: { level: 9 } });

    const fetchPromises = urls.map(async (url, index) => {
        const response = await fetch(url, { headers: { 'x-api-key': TOKEN } });

        if (!response.ok) {
            throw new Error(`Error al descargar CSV ${index + 1}: ${response.status}`);
        }

        const fileStream = Readable.from(await response.text());
        zip.append(fileStream, { name: `document_${index + 1}.csv` });
    });

    await Promise.all(fetchPromises);
    zip.finalize();

    return zip;
};

const upoService = { sendDoc, pollApiForResult, downloadCSVDocs };

export default upoService;

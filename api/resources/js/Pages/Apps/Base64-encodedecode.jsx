import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Base64EncodeDecode({ auth, app }) {

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const encodeBase64 = () => {
        try {
            const encoded = btoa(input);
            setOutput(encoded);
        } catch (error) {
            setOutput('Error: Invalid input');
        }
    };

    const decodeBase64 = () => {
        try {
            const decoded = atob(input);
            setOutput(decoded);
        } catch (error) {
            setOutput('Error: Invalid input');
        }
    };

    const detectInputType = () => {
        try {
            const decoded = atob(input);
            alert("BASE64")
        } catch (error) {
            alert("STRING")
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <Link className='text-blue-500' href={route('apps')}>Apps</Link> &gt; {app.name}</h2>}
        >
            <Head title={app.name} />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row flex-wrap">
                        <div className="w-full bg-white p-4 m-0 shadow-sm sm:rounded">
                            <h1 className="text-2xl font-bold text-center text-gray-800">Base64 Encoder / Decoder</h1>

                            <textarea
                                className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                placeholder="Enter text or base64 string..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-5">
                                <button
                                onClick={encodeBase64}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                Encode
                                </button>
                                <button
                                    onClick={decodeBase64}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                    Decode
                                </button>
                            </div>

                            <textarea
                                className="w-full p-3 border rounded-lg text-gray-700 bg-gray-50"
                                rows="4"
                                placeholder="Result..."
                                value={output}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
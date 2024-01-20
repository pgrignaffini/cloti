/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useState } from 'react';
import useClotiStore from '~/hooks/useClotiStore';
import { getAuthenticationHeader } from '~/utils/auth';

type TryOnResponse = {
    model_metadata: {
        model_file: string;
        gender: string;
        model_id: string;
        shoes_id: string;
        version: string;
    };
    success: boolean;
}

const TryOnComponent = () => {
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const { selectedBottom, selectedTop, selectedModel, setSelectedModel } = useClotiStore()
    const [isLoading, setIsLoading] = useState(false);

    const handleTryOn = async () => {
        setIsLoading(true);
        const data = JSON.stringify({
            garments: {
                tops: selectedTop?.id,
                bottoms: selectedBottom?.id,
            },
            model_id: selectedModel?.id,
        });

        try {
            const response = await axios.post('https://api.revery.ai/console/v1/request_tryon', data, {
                headers: getAuthenticationHeader(true),
            });

            const modelFile = (response.data as TryOnResponse).model_metadata.model_file;
            setSelectedModel({
                id: (response.data as TryOnResponse).model_metadata.model_id,
                file: modelFile,
            });
        } catch (error) {
            console.error('Error during try-on request:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-around mt-8'>
                <div className='flex flex-col space-y-2'>
                    <p>Selected Model:</p>
                    {selectedModel && <img className='w-24 h-32' src={`https://media.revery.ai/generated_model_image/${selectedModel.file}.png`} alt={`Model ${selectedModel.file}`} />}
                </div>
                <div className='flex flex-col space-y-2'>
                    <p>Selected Top:</p>
                    {selectedTop && <img className='w-24 h-32' src={selectedTop.image} alt={`Top ${selectedTop.id}`} />}
                </div>
                <div className='flex flex-col space-y-2'>
                    <p>Selected Bottom:</p>
                    {selectedBottom && <img className='w-24 h-32' src={selectedBottom.image} alt={`Bottom ${selectedBottom.id}`} />}
                </div>

            </div>
            <button onClick={handleTryOn} className='bg-blue-400 w-full mt-4 p-3 text-white rounded-xl' disabled={isLoading}>Try On</button>
            {isLoading && <p>Loading...</p>}
            {generatedImageUrl && <img src={generatedImageUrl} className='w-48 h-64 mt-12 mx-auto' alt="Generated Model" />}
        </div>
    );
};


export default TryOnComponent;
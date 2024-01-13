/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useClotiStore from '~/hooks/useClotiStore';
import { getAuthenticationHeader } from '~/utils/auth';

type GetModelsResponse = {
    model_files: string[];
    models: string[];
    success: boolean;
}

const Models = () => {
    const { setSelectedModel } = useClotiStore()

    const extractModelId = (model: string) => {
        const modelId = model.split(';')[0]!;
        return modelId;
    }

    const fetchModels = async () => {
        const result = await axios.get('https://api.revery.ai/console/v1/get_model_list?gender=female', {
            headers: getAuthenticationHeader()
        });

        return result.data as GetModelsResponse;
    };

    const { data: response } = useQuery({ queryKey: ['models'], queryFn: fetchModels })

    return (
        <div className='mt-4'>
            <p>Models</p>
            <div className='grid grid-cols-9 gap-2'>
                {response?.model_files?.map(model => (
                    <img key={model} onClick={() => {
                        setSelectedModel({
                            id: extractModelId(model),
                            file: model,
                        })
                    }} className='w-24 h-32 cursor-pointer hover:border-2 border-red-400' src={`https://media.revery.ai/generated_model_image/${model}.png`} alt={`Model ${model}`} />
                ))}
            </div>
        </div>
    );
}

export default Models;
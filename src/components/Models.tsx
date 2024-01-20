/* eslint-disable @next/next/no-img-element */
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import useClotiStore from '~/hooks/useClotiStore';
import { MdMale, MdFemale } from "react-icons/md";

// import { getAuthenticationHeader } from '~/utils/auth';

// type GetModelsResponse = {
//     model_files: string[];
//     models: string[];
//     success: boolean;
// }

export const maleModel = {
    id: "1671082108",
    file: "1671082108;symbol_185698-symbol_169422;16453649100051203"
}
export const femaleModel = {
    id: "1542389041",
    file: "1542389041;symbol_186303-symbol_180023;16453531991403253"
}

const Models = () => {
    const { setSelectedModel, selectedModel } = useClotiStore()

    // const extractModelId = (model: string) => {
    //     const modelId = model.split(';')[0]!;
    //     return modelId;
    // }
    // const fetchModels = async () => {
    //     const result = await axios.get('https://api.revery.ai/console/v1/get_model_list?gender=female', {
    //         headers: getAuthenticationHeader()
    //     });
    //     return result.data as GetModelsResponse;
    // };

    // const { data: response } = useQuery({ queryKey: ['models'], queryFn: fetchModels })

    return (
        <div className='h-1/3 sticky z-40 top-0 bg-[#f3f3f1]'>
            <div className='relative w-64 h-full mx-auto'>
                <img key={selectedModel?.id} className='w-full h-full' src={`https://media.revery.ai/generated_model_image/${selectedModel?.file}.png`} alt={`Model ${selectedModel?.file}`} />
                <div className='absolute bottom-2 right-2'>
                    <div className='flex items-center h-fit space-x-2'>
                        <button onClick={() => {
                            setSelectedModel(femaleModel)
                        }} className='p-1 bg-white rounded-full border-[1px] shadow-xl'>
                            <MdFemale className='w-6 h-6 text-pink-400' />
                        </button>
                        <button onClick={() => {
                            setSelectedModel(maleModel)
                        }} className='p-1 rounded-full bg-white border-[1px] shadow-xl'>
                            <MdMale className='w-6 h-6 text-blue-400' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='border-b-[1px]'></div>
        </div>
    );
}

export default Models;
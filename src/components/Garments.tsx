/* eslint-disable @next/next/no-img-element */
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useClotiStore from '~/hooks/useClotiStore';
import { LiaTshirtSolid } from "react-icons/lia";
import { PiPants } from "react-icons/pi";
import { BsArrowRightCircleFill } from "react-icons/bs";

type Garment = {
    id: string;
    gender: string;
    image_urls: {
        product_image: string;
    };
    tryon: {
        category: string;
        enabled: boolean;
        open_outerwear: boolean;
    };
}

type GetFilteredGarmentsResponse = {
    garments: [Garment],
    success: boolean;
    total_page: number;
}

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

const Garments = () => {

    const { selectedBottom, selectedTop, selectedModel, setSelectedModel, setSelectedBottom, setSelectedTop } = useClotiStore()

    const fetchGarments = async () => {
        const result = await axios.get('/api/getGarments');
        return result.data as GetFilteredGarmentsResponse;
    };

    // const deleteGarment = async (garmentId: string) => {
    //     try {
    //         const result = await axios.put(`https://api.revery.ai/console/v1/delete_garment`, { garment_id: garmentId }, {
    //             headers: getAuthenticationHeader()
    //         });
    //         console.log(result.data);
    //     } catch (error) {
    //         console.error('Error during try-on request:', error);
    //     }
    // }
    const { data: response } = useQuery({ queryKey: ['garments'], queryFn: fetchGarments })

    const tops = response?.garments?.filter(garment => garment.tryon.category === 'tops');
    const bottoms = response?.garments?.filter(garment => garment.tryon.category === 'bottoms');

    const buildGarmentsBody = ({ topId, bottomId }: { topId?: string, bottomId?: string }) => {
        const product_ids: {
            tops?: string;
            bottoms?: string;
        } = {};
        if (topId) {
            product_ids.tops = topId;
        } else if (selectedTop) {
            product_ids.tops = selectedTop.id;
        }
        if (bottomId) {
            product_ids.bottoms = bottomId;
        } else if (selectedBottom) {
            product_ids.bottoms = selectedBottom.id;
        }
        if (Object.keys(product_ids).length === 0) {
            return {}; // or return a default value or throw an error
        }
        return {
            product_ids,
            model_id: selectedModel?.id,
            background: 'white',
        };
    }

    const handleTryOn = async ({ topId, bottomId }: { topId?: string, bottomId?: string }) => {
        const data = buildGarmentsBody({ topId, bottomId });
        try {
            const response = await axios.post('/api/tryon', data)
            const modelFile = (response.data as TryOnResponse).model_metadata.model_file;
            setSelectedModel({
                id: (response.data as TryOnResponse).model_metadata.model_id,
                file: modelFile,
            });
        } catch (error) {
            console.error('Error during try-on request:', error);
        }
    };

    return (
        <div className='flex flex-col mt-2 overflow-y-scroll flex-1 space-y-2 py-4'>
            <div className='flex items-center space-x-2 pl-4'>
                <LiaTshirtSolid className='w-6 h-6 text-black' />
                <span className='font-semibold uppercase'>corpo</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>intimo</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>layer</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>jackets</span>
            </div>
            <div className='flex space-x-2 mt-4 overflow-x-scroll pl-2'>
                {tops?.map(top => (
                    <div key={top.id} onClick={() => {
                        setSelectedTop({
                            id: top.id,
                            image: top.image_urls.product_image,
                        })
                        void handleTryOn({
                            topId: top.id,
                        });
                    }} className='w-32 h-32 relative flex-none cursor-pointer rounded-md border-[1px]' >
                        <img className='h-full w-full object-cover' src={top.image_urls.product_image} alt={`Top ${top.id}`} />
                        <BsArrowRightCircleFill className='absolute bg-white rounded-full bottom-1 right-1 w-6 h-6 text-gray-400' />
                    </div>
                ))}
            </div>
            <div className='flex items-center space-x-2 pt-6 pl-4'>
                <PiPants className='w-6 h-6 text-black' />
                <span className='font-semibold uppercase'>pantaloni</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>lunghi</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>corti</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>sport</span>
            </div>
            <div className='flex space-x-2 mt-4 overflow-x-scroll pl-2'>
                {bottoms?.map(bottom => (
                    <div key={bottom.id} onClick={() => {
                        setSelectedBottom({
                            id: bottom.id,
                            image: bottom.image_urls.product_image,
                        })
                        void handleTryOn({
                            bottomId: bottom.id,
                        });
                    }} className='relative w-32 h-32 flex-none cursor-pointer rounded-md border-[1px]' >
                        <img className='h-full w-full object-cover' src={bottom.image_urls.product_image} alt={`Top ${bottom.id}`} />
                        <BsArrowRightCircleFill className='absolute bg-white rounded-full bottom-1 right-1 w-6 h-6 text-gray-400' />
                    </div>
                ))}
            </div>
            <div className='flex items-center space-x-2 pt-6 pl-4'>
                <PiPants className='w-6 h-6 text-black' />
                <span className='font-semibold uppercase'>pantaloni</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>lunghi</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>corti</span>
                <span className='font-semibold uppercase text-sm px-2 py-[0.5px] rounded-lg bg-gray-300'>sport</span>
            </div>
            <div className='flex space-x-2 mt-4 overflow-x-scroll pl-2'>
                {bottoms?.map(bottom => (
                    <div key={bottom.id} className='relative w-32 h-32 flex-none cursor-pointer rounded-md border-[1px]' >
                        <img onClick={() => {
                            setSelectedBottom({
                                id: bottom.id,
                                image: bottom.image_urls.product_image,
                            })
                        }} className='h-full w-full object-cover' src={bottom.image_urls.product_image} alt={`Top ${bottom.id}`} />
                        <BsArrowRightCircleFill className='absolute bg-white rounded-full bottom-1 right-1 w-6 h-6 text-gray-400' />
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Garments;


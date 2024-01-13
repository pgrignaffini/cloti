/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getAuthenticationHeader } from '~/utils/auth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useClotiStore from '~/hooks/useClotiStore';

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

const Garments = () => {

    const { setSelectedBottom, setSelectedTop } = useClotiStore()

    const fetchGarments = async () => {
        const result = await axios.get('https://api.revery.ai/console/v1/get_filtered_garments', {
            headers: getAuthenticationHeader()
        });
        return result.data as GetFilteredGarmentsResponse;
    };

    const deleteGarment = async (garmentId: string) => {
        try {
            const result = await axios.put(`https://api.revery.ai/console/v1/delete_garment`, { garment_id: garmentId }, {
                headers: getAuthenticationHeader()
            });
            console.log(result.data);
        } catch (error) {
            console.error('Error during try-on request:', error);
        }
    }

    const { data: response } = useQuery({ queryKey: ['garments'], queryFn: fetchGarments })

    const tops = response?.garments?.filter(garment => garment.tryon.category === 'tops');
    const bottoms = response?.garments?.filter(garment => garment.tryon.category === 'bottoms');

    return (
        <div className='flex items-center justify-between'>
            <div>
                <p>Tops</p>
                <div className='flex space-x-2'>
                    {tops?.map(top => (
                        <div key={top.id} >
                            <img onClick={() => {
                                setSelectedTop({
                                    id: top.id,
                                    image: top.image_urls.product_image,
                                })
                            }} className='w-24 h-32 cursor-pointer hover:border-2 border-red-400' src={top.image_urls.product_image} alt={`Top ${top.id}`} />
                            {/* <button onClick={() => deleteGarment(top.id)}>Delete</button> */}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p>Bottoms</p>
                <div className='flex space-x-2'>
                    {bottoms?.map(bottom => (
                        <div key={bottom.id} >
                            <img onClick={() => {
                                setSelectedBottom({
                                    id: bottom.id,
                                    image: bottom.image_urls.product_image,
                                })
                            }} className='w-24 h-32 cursor-pointer hover:border-2 border-red-400' src={bottom.image_urls.product_image} alt={`Top ${bottom.id}`} />
                            {/* <button onClick={() => deleteGarment(bottom.id)}>Delete</button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}


export default Garments;


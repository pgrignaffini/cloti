/* eslint-disable @next/next/no-img-element */
// components/GarmentUploader.tsx
import React, { useState } from 'react';
import { getAuthenticationHeader } from '~/utils/auth';
import axios from 'axios';




type ProcessNewGarmentResponse = {
    garment_id: string;
    success: boolean;
}

const GarmentUploader = () => {
    const [category, setCategory] = useState('tops');
    const [gender, setGender] = useState('female');
    const [imageUrl, setImageUrl] = useState('');

    const uploadGarment = async () => {
        const data = JSON.stringify({
            category,
            gender,
            // bottoms_sub_category: "pants",
            "garment_img_url": imageUrl
        });

        try {
            const result = await axios.post('https://api.revery.ai/console/v1/process_new_garment', data, {
                headers: getAuthenticationHeader(true)
            })
            const { garment_id } = result.data as ProcessNewGarmentResponse;
            console.log(garment_id);

        } catch (error) {
            console.error('Error during try-on request:', error);
        }
    };

    return (
        <div className='flex flex-col items-center space-y-4'>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                {/* Other categories */}
            </select>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                {/* Other genders */}
            </select>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
            <button onClick={uploadGarment}>Upload Garment</button>
        </div>
    );
};

export default GarmentUploader;

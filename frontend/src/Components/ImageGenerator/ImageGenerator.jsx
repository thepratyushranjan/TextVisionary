import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ImageGenerator.css';
import default_image from '../Assets/default_image.png';

const ImageGenerator = () => {
    const [ imageId, setImageId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenerate = async () => {
        setLoading(true);
        const prompt = document.querySelector('.search-input').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/generate-images/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompts: [prompt] }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Debug response structure

            if (data.results && data.results.length > 0) {
                const image = data.results[0];
                setImageId(image.id);
                navigate(`/image/${image.id}`);
            } else {
                console.error('No results found');
            }
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='ai-image-generator'>
            <div className='header'> TEXT <span>VISIONARY</span> </div>
            <div className='img-loading'>
                <img src={default_image} alt="Default" />
            </div>
            <div className='search-box'>
                <input type="text" className='search-input' placeholder="Describe What You Want To See" />
                <div className='generate-btn' onClick={handleGenerate}>
                    {loading ? 'Generating...' : 'Generate'}
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;

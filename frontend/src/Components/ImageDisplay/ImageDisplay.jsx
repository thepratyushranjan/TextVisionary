import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ImageDisplay.css'; // Import the CSS file


const ImageDisplay = () => {
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State for preview modal

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/images/${id}/`);
                const imageUrl = `http://127.0.0.1:8000${response.data.result.image_file}`;
                setImageUrl(imageUrl);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading image: {error.message}</p>;

    return (
        <div className='image-display'>
            <div className='header'> Image <span>Details</span> </div>
            {imageUrl ? (
                <>
                    <img src={imageUrl} alt="Fetched from API" />
                    <div className="image-display-buttons">
                        <button className="preview-btn" onClick={() => setIsPreviewOpen(true)}>Preview</button>
                        <a href={imageUrl} download="image.png">
                            <button className="download-btn">Download</button>
                        </a>
                    </div>
                </>
            ) : (
                <p>No image found</p>
            )}

            {isPreviewOpen && (
                <div className="preview-modal">
                    <div className="preview-content">
                        <span className="close" onClick={() => setIsPreviewOpen(false)}>&times;</span>
                        <img src={imageUrl} alt="Preview" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageDisplay;

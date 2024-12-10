// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploader = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');

//   // Cloudinary's upload preset and cloud name
//   const CLOUD_NAME = 'elsanta';  // Replace with your cloud name
//   const UPLOAD_PRESET = 'imageUrl';  // Replace with your upload preset

//   // Handle file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = async () => {
//     if (!selectedImage) {
//       alert('Please select an image first!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedImage);
//     formData.append('upload_preset', UPLOAD_PRESET);

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         formData
//       );

//       // Get the image URL from the response
//       const imageUrl = response.data.secure_url;
//       setImageUrl(imageUrl);  // Store the URL for display or further use
//       console.log('Uploaded image URL:', imageUrl);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Image to Cloudinary</h2>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleImageUpload}>Upload Image</button>

//       {imageUrl && (
//         <div>
//           <h3>Uploaded Image</h3>
//           <img src={imageUrl} alt="Uploaded" width="300" />
//           <p>Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;

import React, { useState, useEffect } from "react";
import axios from 'axios'; // Axios kütüphanesini import et

const Gorsel = (props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Axios kullanarak API'ye resim URL'sini gönderen fonksiyon
const saveImageUrlToApi = async (imageURI) => {
  try {
    
    const response = await axios.post('http://localhost:8080/save-image', {  imageURI }); // API'ye "imageuri" olarak gönder
    console.log(response.data); // API'den gelen yanıtı konsola yazdırır
    
    return response.data; // API'den gelen yanıtı döndürür
  } catch (error) {
    console.error('Error saving image URL to API: ', error);
    throw error; // Hata durumunda hatayı yeniden fırlatır
  }
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setIsImageLoaded(true);
      const imageUrlData = e.target.result;
      console.log("Alınan resmin URL'si:", imageUrlData); // Resmin URL'sini konsola yazdır
      setImageUrl(imageUrlData); // Resim URL'sini güncelle
      try {
        // Resim URL'sini API'ye gönder
        await saveImageUrlToApi(imageUrlData);
      } catch (error) {
        // Hata durumunu işleyin
      }
    };
    reader.readAsDataURL(file);
  }
};


  useEffect(() => {
    setImageUrl("");
    setIsImageLoaded(false);
  }, [props.isImage]);

  const handlePlusClick = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <div>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={(event) => {
          props.onImageChange(event);
          handleImageChange(event);
        }}
        style={{
          display: "none",
        }}
      />
      {isImageLoaded && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {!isImageLoaded && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={handlePlusClick}
          style={{ cursor: "pointer" }}
        >
          <line
            x1="100"
            y1="70"
            x2="70"
            y2="70"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="85"
            y1="55"
            x2="85"
            y2="85"
            stroke="black"
            strokeWidth="2"
          />
          <text x="60" y="97" fill="black" fontSize="13">
            GÖRSEL
          </text>
        </svg>
      )}
    </div>
  );
};

export default Gorsel;

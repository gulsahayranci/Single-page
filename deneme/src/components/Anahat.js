
import React, { useState, useEffect } from 'react';
import { database, storage } from "../Firebase-Config";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import NewTitle from "./NewTitle";
import Description from "./Description";
import Gorsel from "./Gorsel";
import Durum from "./Durum";
import { Button } from "@mui/material";

const Anahat = () => {
  //Kullanılacak useStateler oluturuldu.
  const [description, setDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [descriptionNew, setDescriptionNew] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlNew, setImageUrlNew] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [descriptionClean, setDescriptionClean] = useState(false);
  const [newTitleClean, setNewTitleClean] = useState(false);
  const [imageUrlClean, setImageUrlClean] = useState(false);

  const handleDescriptionChange = (description) => {
    console.log("description", description);
    setDescription(description);
  };
  //Kullanıcı bir kaydetme eylemini tetiklediğinde verileri bir Firestore veritabanına kaydedildi.
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setImageFile(file);
  };

  console.log("description", description);
  console.log("new title", newTitle);
  console.log("image url", imageUrl);
  console.log("isActive", isActive);

  const handleSaveData = async () => {
    setIsActive(true);
    try {
      if (imageFile) {
        const storageRef = ref(storage, `images/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("downloadURL", downloadURL);
        
          const jsonData = JSON.stringify({
            title: newTitle,
            description: description,
            imageUrl: downloadURL,
          });
          console.log("seval",jsonData)
          console.log("jsonData", jsonData);
      
        
            // JSON formatındaki verileri API endpoint'ine gönder
            axios
              .post(
                "http://localhost:8080/save-data",
                jsonData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log("API response:", response.data);
                // Başarılı API yanıtını işle
              })
              .catch((error) => {
                console.error("Error saving data to API: ", error);
                // API hatası ile ilgilen
              });
          }
        );
        
      } else {
        // Send data to API endpoint without image
        axios
          .post(
            "http://localhost:8080/save-data",
            {
              title: newTitle,
              description: description,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("API response:", response.data);
            // Handle successful API response
          })
          .catch((error) => {
            console.error("Error saving data to API: ", error);
            // Handle API error
          });
      }

      setIsActive(false);
      setDescriptionNew(description);
      setTitle(newTitle);
      setImageUrlClean(!imageUrlClean);
      setImageFile(null);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };
  return (
    <div>
      <svg width="700" height="700" xmlns="http://www.w3.org/2000/svg">
        <svg x="-150" y="-110" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M208 130.5C204.41 130.5 201.5 133.41 201.5 137V160C201.5 163.59 204.41 166.5 208 166.5H284C287.59 166.5 290.5 163.59 290.5 160V137C290.5 133.41 287.59 130.5 284 130.5H208Z"
            fill="white"
            stroke="#4F4F4F"
          />
          <text x="208" y="147" fill="#4F4F4F" fontSize="14">
            New Title
          </text>
        </svg>
        <rect
          x="50"
          y="50"
          width="177"
          height="291"
          rx="10"
          fill="white"
          stroke="#4F4F4F"
        />
        <rect
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.5"
          x="55"
          y="175"
          width="163"
          height="137"
          fill="#C56E4F"
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
          <rect
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="355"
            width="379"
            height="6"
            fill="#C4C4C4"
          />
        </svg>

        <foreignObject x="60" y="60" width="280" height="90">
          <NewTitle onTitleChange={setNewTitle} isTitle={newTitleClean} />
        </foreignObject>

        <foreignObject x="60" y="80" width="280" height="90">
          <Description
            onDescriptionChange={handleDescriptionChange}
            isDescription={descriptionClean}
          />
        </foreignObject>
        <foreignObject x="55" y="175" width="163px" height="137px">
          <Gorsel onImageChange={handleImageChange} isImage={imageUrlClean} />
        </foreignObject>

        <foreignObject
          x="205"
          y="320"
          width="14"
          height="16"
          style={{ backgroundColor: isActive ? "green" : "grey" }}
        >
          <Button disabled={isActive} onClick={handleSaveData}></Button>
        </foreignObject>
      </svg>
      //
      <div style={{ position: "absolute", top: "400px" }}>
        <svg width="700" height="700" xmlns="http://www.w3.org/2000/svg">
          <svg x="-150" y="-110" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M208 130.5C204.41 130.5 201.5 133.41 201.5 137V160C201.5 163.59 204.41 166.5 208 166.5H284C287.59 166.5 290.5 163.59 290.5 160V137C290.5 133.41 287.59 130.5 284 130.5H208Z"
              fill="white"
              stroke="#4F4F4F"
            />
            <text x="208" y="147" fill="#4F4F4F" fontSize="14">
              New Title
            </text>
          </svg>
          <rect
            x="50"
            y="50"
            width="177"
            height="291"
            rx="10"
            fill="white"
            stroke="#4F4F4F"
          />
          <rect
            xmlns="http://www.w3.org/2000/svg"
            opacity="0.5"
            x="55"
            y="175"
            width="163"
            height="137"
            fill="#C56E4F"
          />

          <foreignObject x="60" y="60" width="280" height="90">
            <div
              style={{
                color: "#C56E4F",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {title}
            </div>
          </foreignObject>
          <foreignObject x="60" y="80" width="280" height="90">
            <div
              style={{
                fontSize: "12px",
                lineHeight: "0.9",
                padding: "5px",
                textAlign: "left",
                wordWrap: "break-word",
              }}
            >
              {descriptionNew}
            </div>
          </foreignObject>
          <foreignObject x="55" y="175" width="163px" height="137px">
            <img
              src={imageUrlNew}
              style={{
                height: "100%",
                width: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                backgroundColor: "white",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
};

export default Anahat;

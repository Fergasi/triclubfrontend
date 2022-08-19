import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import uploadPhoto from "../assets/uploadPhoto.png";

const defaultSrc = uploadPhoto;

export const ImgCropperComp = ({ setPhoto }) => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setPhoto(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const fileInput = useRef(null);
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Cropper
          restore={true}
          style={{ height: "100%" }}
          zoomTo={0}
          cropBoxResizable={false}
          dragMode={"none"}
          aspectRatio={550 / 350}
          preview='.img-preview'
          src={image}
          viewMode={3}
          maxHeight={"550px"}
          maxWidth={"350px"}
          disabled={true}
          locked={true}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>

      <input
        type='file'
        onChange={onChange}
        style={{ display: "none" }}
        ref={fileInput}
      />
      <div id='cropperButtons'>
        <Button
          variant='dark'
          onClick={() => {
            fileInput.current.click();
          }}
        >
          Upload Program Photo
        </Button>
        <Button variant='dark' onClick={getCropData}>
          Crop Photo
        </Button>
      </div>
    </div>
  );
};

export default ImgCropperComp;

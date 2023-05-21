import React, { FC, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { authenticationEndpoint, publicKey, urlEndpoint } from "../../config";
import { toast } from "react-hot-toast";
import { UploadResponse } from "../../types/imgUpload.types";

type ImageInputProps = {
  image: string;
  setImage: (url: string) => void;
};

const ImageInput: FC<ImageInputProps> = ({ image, setImage }) => {
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      {image && (
        <img
          src={image}
          alt="user photo"
          className="object-cover w-20 h-20 mb-4 border-2 rounded-full border-sky-600"
        />
      )}

      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <label htmlFor="imageOfUser" className="cursor-pointer">
          + Photo
        </label>
        <IKUpload
          fileName="user.png"
          onError={() =>
            toast.error("An error occurred while uploading an image.")
          }
          onSuccess={(res: UploadResponse) => setImage(res.url)}
          id="imageOfUser"
          name="img"
          data-max-size="2048"
          type="file"
          onChange={handleFile}
          validateFile={file => {
            if (
              file.size < 2 * 1024 * 1024 &&
              /[^\s]+(.*?).(jpg|png)$/i.test(file.name)
            ) {
              return true;
            }
            toast.error(
              "Image should be less than 2 mb with jpg and png extension"
            );
            return false;
          }}
        />
      </IKContext>
    </div>
  );
};

export default ImageInput;

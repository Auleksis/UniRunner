import { ChangeEventHandler, useRef, useState } from "react";
import s from "./ProfilePhoto.module.css";

export interface ProfilePhotoProps {
  photo?: string;
  onPhotoChanged: (photo: File) => void;
}

const ProfilePhoto: React.FunctionComponent<ProfilePhotoProps> = ({
  photo,
  onPhotoChanged,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const onChangeClciked = () => {
    inputRef.current?.click();
  };

  const onFileChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const image = e.target.files[0];

      if (
        !image ||
        (image.type !== "image/png" && image.type !== "image/jpeg")
      ) {
        //setError("Разрешается загружать фото в JPG или PNG форматах");
        console.log("Error");
        return;
      }
      console.log("Success");

      const reader = new FileReader();
      reader.onload = () => {
        if (photoRef.current) {
          if (typeof reader.result === "string") {
            photoRef.current.src = reader.result;
          }
        }
      };
      reader.readAsDataURL(image);

      onPhotoChanged(image);
    }
  };

  return (
    <div className={s.photo_relative_container}>
      <img
        ref={photoRef}
        className={s.photo}
        src={photo ? photo : "/src/assets/icons/profile.svg"}
      />
      <div className={s.action_box_div}>
        <button className={s.change_photo_button} onClick={onChangeClciked}>
          <p className={s.subtext}>Изменить</p>
        </button>
        <input
          className={s.input_photo}
          ref={inputRef}
          type="file"
          onChange={onFileChanged}
          accept="image/jpeg, image/png"
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;

// import { storage } from "@/services/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const useFirebaseImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const imgBlob = URL.createObjectURL(e.target.files[0]);
      setImageBlob(imgBlob);
    }
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      if (!image) {
        setIsLoading(false);
        resolve(null);
        return;
      }

      // console.log("User authenticated:", currentUser);

      const storageRef = ref(getStorage());

      const uploadTask = uploadBytes(
        ref(storageRef, `images/${image.name}`),
        image
      );

      uploadTask
        .then(async (snapshot) => {
          const downloadUrl = await getDownloadURL(snapshot.ref);
          setUrl(downloadUrl);
          setIsLoading(false);
          resolve(downloadUrl);
        })
        .catch((error) => {
          console.error(error.message);
          setIsLoading(false);
          reject(error.message);
        });
    });
  };

  return {
    image,
    url,
    imageBlob,
    progress,
    isLoading,
    handleChange,
    handleUpload,
  };
};

export default useFirebaseImageUpload;

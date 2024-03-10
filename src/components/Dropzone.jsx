import uploadIcon from "../assets/icons/upload.svg";
import {useUserStore} from "../store/User.js";
import {useEffect, useState} from "react";

export const Dropzone = ({ size, image } = { size: "h-64", image: null }) => {
    const {user, setUser} = useUserStore((state) => ({user: state.user, setUser: state.setUser}));
    const [profileImg, setProfileImg] = useState(image);

    useEffect(() => {
        setProfileImg(user.profileImg);
    }, [user]);
    const handleChange = async (e) => {
        const file = e.target.files[0];
        await (async () => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            console.log(reader.result, file)
            reader.onloadend = () => {
                setUser({
                    ...user,
                    profileImg: reader.result
                });
            }
        })();
    }
  return (
    <div className="flex items-center justify-center w-full bg-transparent">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center p-2 ${size} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        {profileImg ? (
          <img
            src={profileImg}
            alt=""
            height="400px"
            className="w-32 h-32 object-fit rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <img
              src={uploadIcon}
              alt=""
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}
        <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
};

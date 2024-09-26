import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { RootState } from '../redux/store';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile, getUser } from "../redux/userSlice";
import { FaSave, FaTrash } from "react-icons/fa";
import defaultAvatar from "../images/user/user-01.png";
// import Loader from "../components/Loader";
import axios from "axios";
import { showNotification } from "../redux/headerSlice";
const Settings = () => {
  
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user } = useSelector((store:RootState) => store.user);
    const [userProfile, setUserProfile] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [avatarURL, setAvatarURL] = useState(defaultAvatar);
    const updateInputValue = (value, id) => {
      setUserProfile({ ...userProfile, [id]: value });
    };
    useEffect(() => {
      if (user?.avatar[0]) {
        setAvatarURL(
          `${
            "https://to-base.com/api/file/download/" +
            user?.avatar[0]
          }`
        );
      }
      user &&
        setUserProfile({
          username: user.username,
          email: user.email,
          files: user.avatar || [],
        });
    }, [user]);
  
    useEffect(() => {
      setErrorMessage(errorMessage);
      !loading &&
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
    }, [errorMessage]);
  
    useEffect(() => {
      if (loading == true) {
        setErrorMessage("Loding...");
      }
    }, [loading]);
  
    const updateProfile = async () => {
      if (userProfile.username.trim() === "")
        return setErrorMessage("username is required!");
      if (userProfile.email.trim() === "")
        return setErrorMessage("Email is required!");
      if (userProfile.email.trim() !== "" && userProfile.email.search("@") === -1)
        return setErrorMessage("Please include an '@' in the email address");
      else {
        setLoading(true);
        let fileIdList = userProfile.files;
        
        if (imageFile) {
          const data = await updateAvartar();
          fileIdList = data?.uploaded?.map((item) => {
            return item?._id;
          });
        }
        const res = await dispatch(
          updateUserProfile({ ...userProfile, files: fileIdList })
        );
        setLoading(false);
        if (!res?.payload?.error) {
          dispatch(showNotification({ message: res?.payload?.message, status: 1 }));
        } else {
          dispatch(showNotification({ message: res?.payload?.error, status: 0 }));
        }
        
        if (!res?.payload?.error) {
          dispatch(getUser());
          setTimeout(() => {
            navigate("/home");
          }, 500);
        }
      }
    };
    const updateAvartar = async () => {
      const formData = new FormData();
      formData.append("image", imageFile);
      const { data } = await axios.post(
        "https://to-base.com/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    };
  
    return (
      <DefaultLayout>
        <div className=" mt-[10px] h-[86vh] mx-8 overflow-y-auto text-[14px] bg-white shadow-md rounded-[10px] py-10 px-10 pt-16 duration-500 font-satoshi">
          <div className="relative text-lg rounded-[10px]">
            <div className=" flex  justify-between items-center min-h-[calc(100vh-400px)] flex-col md:flex-row md:justify-between">
              <div className="w-[60%] md:w-[40%] flex justify-center py-10 md:border-r-[2px] border-gray-200">
                <div className="max-w-[380px] max-h-[380px] md:w-[90%] aspect-[1/1] shadow-xl border border-gray-200 rounded-full p-[10px]">
                  <label htmlFor="avatar">
                    <img
                      src={avatarURL}
                      alt=""
                      className="object-cover w-[100%] h-[100%] rounded-full"
                    />
                    <input
                      onChange={(e) => {
                        setImageFile(e.target.files[0]);
                        setAvatarURL(URL.createObjectURL(e.target.files[0]));
                      }}
                      type="file"
                      name="avatar"
                      id="avatar"
                      hidden
                    />
                  </label>
                </div>
              </div>
              <div className="w-[60%] flex justify-center px-6 pt-12">
                <div className="inline-block text-2xl">
                  <p className="flex flex-row justify-between">
                    <span className="w-[48%]">
                      <label
                        htmlFor="username"
                        className="block text-gray-700 text-xl"
                      >
                        Username<span className="text-minionRed ml-3">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          updateInputValue(e.target.value, e.target.id);
                        }}
                        defaultValue={userProfile?.username}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="ex:Gru"
                        className="  text-gray-700 border border-white focus:border-minionBlue  bg-gray-100 rounded-md w-full py-2 pl-6 text-xl outline-none"
                      />
                    </span>
                  </p>
                  <p className="pt-5">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-xl"
                    >
                      Email<span className="text-minionRed ml-3">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        updateInputValue(e.target.value, e.target.id);
                      }}
                      defaultValue={userProfile?.email}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="ex:gru.lucy@gmial.com"
                      className=" border-white border focus:border-minionBlue  bg-gray-100  text-gray-700 placeholder:text-gray-700 placeholder:opacity-50 rounded-md w-full py-2 pl-6 text-xl outline-none  "
                    />
                  </p>
                  
                  <p
                    className={`text-xl mt-2 text-minionRed text-center duration-300 ease-out `}
                  >
                    {errorMessage}
                  </p>
                  <div className="flex justify-end my-4 items-center">
                    <button
                      onClick={() => updateProfile()}
                      className="flex justify-center items-center gap-1 px-4 py-2 hover:text-minionBlue hover:bg-white border-[1px] border-minionBlue font-satoshi text-xl rounded-md mx-2 t-white bg-minionBlue duration-300 ease-out"
                    >
                      <span className="pr-2">
                        {" "}
                        <FaSave />
                      </span>
                      Save
                    </button>
                    <Link
                      to={`/home`}
                      className=" flex justify-center text-xl items-center gap-1 px-4 py-2 hover:text-minionRed hover:bg-white border-[1px] hover:border-minionRed font-satoshi rounded-md  mx-2  bg-minionRed duration-300 ease-out"
                    >
                      <span className="pr-2">
                        {" "}
                        <FaTrash />
                      </span>
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-[2]">
              {/* <Loader /> */}
            </div>
          </div>
        )}
      </DefaultLayout>
    );
  }
  
export default Settings;

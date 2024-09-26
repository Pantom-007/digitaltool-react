import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from "axios";
import { createchannel, getAllchannels } from "../redux/channelSlice";
interface AddChannelProps {
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
}

const AddChannel = ({ modalVisible, setModalVisible }: AddChannelProps) => {
  const { user, users } = useSelector((store: RootState) => store.user);
  
  const [name, setName] = useState("");
  const [invite_user, setInvite] = useState([]);
  const [invite_users, setInvites] = useState([]);
  const [invite, setUser] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(errorMessage);
    if (!loading) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage, loading]);

  useEffect(() => {
    if (loading) {
      setErrorMessage("Loading...");
    }
  }, [loading]);
  const dispatch=useDispatch();
  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "")
      return setErrorMessage("Channel name is required!");
    if (invite_user == null)
      return setErrorMessage("Username is required!");
    setLoading(true);
    const res = await dispatch(createchannel({name:name, create_user:user._id, invite_users:invite_users}));
    dispatch(getAllchannels());
    setErrorMessage(res.payload.message);
    setLoading(false);
    setName("");
    setInvite([]);
    setInvites([]);
    setUser("");
  };
  const create = () =>{
    if(invite) {
      setInvite((c)=>([...c, invite]));
      setInvites((c)=>[...c,users.filter((item:any)=>{return item.username==invite})[0]._id]);
    }
    setUser("");
  }
  return (
    <div
      className={`fixed inset-0 flex w-screen h-screen z-9999 flex-col duration-300 dark:bg-boxdark ${modalVisible ? 'block' : 'hidden'}`}
      style={{ backgroundColor: 'rgba(100, 116, 139, 0.7)' }}
    >
      <div className='w-[80%] md:w-1/3 h-[80%] md:h-2/3 rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mx-auto my-auto'>
        <div className='w-full flex justify-end px-5 pt-5'>
          <button onClick={() => setModalVisible(false)} className='w-8 h-8 text-black dark:text-white hover:text-primary'><IoMdClose className='w-full h-full' /></button>
        </div>
        <div>
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-bold text-center text-black dark:text-white">
              新規チャンネルを追加する1
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddChannel;

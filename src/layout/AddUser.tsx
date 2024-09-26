import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { updatemeeting } from '../redux/meetingSlice';
import { getAllchannels } from '../redux/channelSlice';

interface AddUserProps {
  memberModalVisible: Number;
  setMemberModalVisible: (arg: Number) => void;
  users : object[];
  res: object;
}

const AddUser = ({ memberModalVisible, setMemberModalVisible, users, res }: AddUserProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [invite_users, setInvites] = useState(res?.invite_users || []);
  const [invite_user, setUsers] = useState([]);
  const [invite, setInvite]=useState<string>('');


  const create = () => {
    if(invite)  {
      setInvites((c)=>[...c, invite])
      setUsers((c)=>[...c, users.filter((item:any)=>{return item.username==invite})[0]._id])
    }
  }

  const dispatch = useDispatch();
  const update = async() => {
    const res1 = await dispatch(updatemeeting({_id:res._id,title:res.title, creaters:res.creaters, meeting: res.meeting, create_user:res.create_user, invite_users:invite_user, period:res.period}))
    await dispatch(getAllchannels());
    setErrorMessage(res1.payload.message)
    setInvite('');
    setInvites([]);
    setUsers([]);
    
  }
  return (
    <div
      className={`fixed inset-0 flex  xl:h-[800px] md:h-[710px] z-9999 flex-col duration-300 dark:bg-boxdark ${memberModalVisible ? 'block' : 'hidden'}`}
      style={{ backgroundColor: 'rgba(100, 116, 139, 0.7)' }}
    >
      <div className='w-[80%] md:w-1/3 h-[80%] md:h-2/3 rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark dark:bg-boxdark mx-auto my-auto'>
        <div className='w-full flex justify-end px-5 pt-5'>
          <button onClick={() => setMemberModalVisible(0)} className='w-8 h-8 text-black dark:text-white hover:text-primary'><IoMdClose className='w-full h-full' /></button>
        </div>
        <div>
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-bold text-center text-black dark:text-white">
            新規ユーザーを追加する
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
              参加ユーザー
              </label>
              <div className='flex gap-5 justify-between w-full p-2'>
                <select
                  id='invite'
                  value={invite}
                  onChange={(e)=>setInvite(e.target.value)}
                  className="w-3/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value={""} disabled></option>
                  {
                    users?.map((item:any,index:number)=>(
                      !invite_users?.includes(item.username) &&
                      <option key={index} value={item.username} >{item.username}</option>
                    ))
                  }
                </select>
                <div  
                  onClick={()=>create()}
                className="w-2/5 inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-bold text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >追加</div>
              </div>
              <div className="relative bg-white dark:bg-form-input">
                <textarea
                  rows={6}
                value={invite_users?.join('\n')}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>     
              </div>
            </div>
            <div
              onClick={()=>update()}
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-bold text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              追 加
            </div>
            <p className='h-2'>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { getAllchannels } from '../../../redux/channelSlice';
import { deletetask, updatetask } from '../../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Input} from 'antd'
import store, { RootState } from '../../../redux/store';
import { IoMdAdd } from 'react-icons/io';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import { MilkdownProvider } from '@milkdown/react';
import MilkdownEditor from '../../Header/MilkdownEditor';
const { TextArea } = Input;
const initial_meeting_obj = {
    id: 0,
    type: '', 
    title: '', 
    content: '', 
    purpose: '', 
    deadline: '', 
    decision: '', 
    etc: ''
  };

const Meeting: React.FC = ({meeting, Id}) => {
  const {user} =useSelector((store:RootState)=>store.user)
    const [dateObj, setDateObj] = useState(meeting);
    useEffect(()=>{
        setDateObj(meeting);
    },[meeting])
    console.log(meeting, dateObj);
    
    const dispatch = useDispatch();
    const removeArgendar = async(meetId:number) => {
        await dispatch(deletetask({meetId, Id}))
        await dispatch(getAllchannels());
    }
    const addmeeting = async() =>{    
        await dispatch(updatetask(dateObj))
        await dispatch(getAllchannels());
        setDateObj({});
    }
    
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);
  const [flag5, setFlag5] = useState(false);

  

  return (
    <div  className='flex flex-col items-start w-full px-5 py-5 mb-5 rounded-md shadow-2 dark:border' id={meeting?._id}>
                  <div className='flex justify-between w-full'>
                    <div className='flex items-center mb-2 w-[100%]'>
                      <p className={`${
                      meeting.type === '共有'
                        ? 'bg-primary'
                        : meeting.type === 'タスク'
                        ? 'bg-warning'
                        : 'bg-success'
                    }  text-white px-2 py-1 rounded text-sm tracking-widest`}>{meeting.type}</p>
                      <div className='w-[90%] flex'>
                        <TextArea className='text-body w-full border-0 text-xl font-bold outline-none dark:bg-boxdark dark:text-[#AEB7C0] focus:border-0 focus:ring-0 active:border-0 focus:outline-none'
                         defaultValue= {dateObj.title}
                         onChange={(e)=>setDateObj({...dateObj,title:e.target.value})} autoSize
                        />
                      </div>
                    </div>
                    {
                      (meeting?.create_user == user?._id) ?
                    <button
                      onClick={()=>removeArgendar(meeting._id)}
                    >
                      <RiDeleteBin5Line className='w-5 h-5' />
                    </button>:<></>
                    }
                  </div>
                  {/* <Toolbar editor={editor} />
                  <EditorContent editor={editor} /> */}
                  <MilkdownProvider>
                    <MilkdownEditor />
                  </MilkdownProvider>
                  {
                    (flag1 || dateObj?.content) ? 
                    <div className='w-full flex my-1 '>
                    <p className='w-[10%] flex items-center'>内容:</p>
                      <TextArea className='text-body w-[90%]  border-0 outline-none dark:bg-boxdark dark:text-[#AEB7C0] focus:border-0 focus:ring-0 active:border-0 focus:outline-none' value= {dateObj.content}
                      
                      onChange={(e)=>setDateObj({...dateObj, content:e.target.value})} autoSize />
                     </div>:<div></div>
                  }
                  
                  {
                    (flag2 || dateObj?.purpose) ?
                    <div className='w-full flex my-1 '>
                    <p className='w-[10%] flex items-center'>ゴール:</p>
                    <TextArea className='text-body w-[90%]  border-0 outline-none dark:bg-boxdark dark:text-[#AEB7C0] focus:border-0 focus:ring-0 active:border-0 focus:outline-none'
                    value= {dateObj.purpose}
                    onChange={(e)=>setDateObj({...dateObj, purpose:e.target.value})} autoSize
                    />
                    </div>:<></>
                 }
                  {
                    (flag3 || dateObj?.deadline) ?
                    <div className='w-full flex my-1 '>
                    <p className='w-[10%] flex items-center'>期日:</p>
                    <input type='date' className='w-[90%]  border-0 outline-none dark:bg-boxdark'
                    value= {dateObj.deadline?.slice(0,10)}
                    onChange={(e)=>setDateObj({...dateObj, deadline:e.target.value})} 
                    />
                    </div> :<></>
                  }
                  {
                    (flag4 || dateObj?.decision) ?
                    <div className='w-full flex my-1 '>
                    <p className='w-[10%] flex items-center'>決定事項:</p>
                    <TextArea className='text-body w-[90%]  border-0 outline-none dark:bg-boxdark dark:text-[#AEB7C0] focus:border-0 focus:ring-0 active:border-0 focus:outline-none'
                    value= {dateObj.decision}
                    onChange={(e)=>setDateObj({...dateObj, decision:e.target.value})} autoSize
                    />
                    </div> :<></>
                  }
                  {
                    (flag5 || dateObj?.etc) ?
                    <div className='w-full flex my-1 '>
                    <p className='w-[10%] flex items-center'>備考:</p>
                    <TextArea className='text-body w-[90%]  border-0 outline-none dark:bg-boxdark dark:text-[#AEB7C0] focus:border-0 focus:ring-0 active:border-0 focus:outline-none'
                    value= {dateObj.etc}
                    onChange={(e)=>setDateObj({...dateObj, etc:e.target.value})} autoSize
                    />
                    </div> :<></>
                  }
                  <div className='relative'>
                    <div 
                      onClick={()=>setFlag((c)=>(!c))}
                    className='w-8 h-8 bg-boxdark/30 dark:bg-white/30 flex justify-center items-center md:text-sm xl:text-base text-white'>  <IoMdAdd/> </div>
                    {
                      flag ? 
                      <div className='flex flex-col w-18 p-1 gap-1 '>
                      <button className='bg-boxdark/30 dark:bg-white/30' onClick={()=>(setFlag1((c)=>(!c)), setFlag(false))}>内容</button>
                      <button className='bg-boxdark/30 dark:bg-white/30' onClick={()=>(setFlag2((c)=>(!c)), setFlag(false))}>ゴール</button>
                      <button className='bg-boxdark/30 dark:bg-white/30' onClick={()=>(setFlag3((c)=>(!c)), setFlag(false))}>期日</button>
                      <button className='bg-boxdark/30 dark:bg-white/30' onClick={()=>(setFlag4((c)=>(!c)), setFlag(false))}>決定事項</button>
                      <button className='bg-boxdark/30 dark:bg-white/30' onClick={()=>(setFlag5((c)=>(!c)), setFlag(false))}>備考</button>
                    </div> :<></>
                    }
                  </div>
                  <div className='flex w-full justify-end'>
                  <button
                    onClick={()=>addmeeting()}
                    className={`inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 mx-3 text-center text-sm font-medium hover:bg-opacity-90 lg:px-8 xl:px-10 active:text-white  text-white bg-primary text-success'}`}
                  >
                  保存
                </button>
                  </div>
                </div>
  );
};

export default Meeting;

import React,{useState} from 'react';
import './Tweet.css'; // Import the CSS file
import {AiFillDelete} from 'react-icons/ai'
import {MdDataSaverOn} from 'react-icons/md'
import Modal from './Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tweet = ({ tweet, id, isTweetDeleted,setIsTweetDeleted,tweets, setTweets,page}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name,setName]=useState(tweet.text)
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName(tweet.text)
  };

  // console.log(id);
  async function Delete() {
    // console.log(id);
    const req = await fetch('http://localhost:1337/api/delete', {
        method:'POST',
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id:id,
          flag:'flag'
        }
        )
    })

    const data = await req.json()
    console.log(data);
    if (data.status === 'ok') {
        // setTweets(data.list)
        setIsTweetDeleted(!isTweetDeleted)
    } else {
        alert(data.error)
    }
}
async function UpdateNote(){

  const res=await fetch('http://localhost:1337/api/update',{
        method:'POST',
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:id,
            tweet:name,
            count:0
        })
    })
    const data = await res.json()
    if (data.status === 'ok') {
        console.log(data.list)
        data.list.reverse();
        let temp=[];
        for(let i=page*12;i<Math.min(data.list.length,page*12+12);i++){
          temp.push(data.list[i]);
        }
        setTweets(temp)
        toast.success('This is a success toast!', 
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Automatically close the toast after 2 seconds
        });
    } else {
        alert(data.error)
    }
}
  return (
    <div>
    <div className="tweet-container">
      
      <div className="tweet-info" >
        {/* <p className="author">@{tweet.author}</p> */}
        <div className="date">{new Date(tweet.date).toLocaleString()}<div title="delete" onClick={Delete}>< AiFillDelete /></div></div>
      </div>
      <div className="tweet-content" onClick={openModal}>
        <p className='a003'>{tweet.text}</p>
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* <h1>Modal Content</h1>
        <p>This is the content inside the modal.</p> */}
        <div className="a-tweet-container">
      
      <div className="a-tweet-info" >
        {/* <p className="author">@{tweet.author}</p> */}
        <div className="a-date">{new Date(tweet.date).toLocaleString()}
        <div className="grid">
        <div className="save" title="save" onClick={UpdateNote}><MdDataSaverOn/></div>
        <div className="delete" title="delete"onClick={Delete}>< AiFillDelete /></div>
        </div>
        </div>
      </div>
      <textarea 
      value={name}
      onChange={(e) => setName(e.target.value)}
      type="text"
      className="a-tweet-content">
        {/* <p className='a-a003'>{tweet.text}</p> */}
      </textarea>
    </div>
      </Modal>
    </div>
  );
};

export default Tweet;

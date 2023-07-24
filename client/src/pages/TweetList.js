import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Tweet from './Tweet';
import { useNavigate } from 'react-router-dom';
import './Tweet.css';
import NavBar from './NavBar';
import {BiSolidPlusCircle} from 'react-icons/bi'
import {GrPrevious,GrNext} from 'react-icons/gr'
const TweetsList = () => {
  const [tweets, setTweets] = useState([]);
  const [t,setT]=useState([]);
  const [tweetInput,setTweetInput]=useState('');
  const [isTweetDeleted,setIsTweetDeleted]  = useState(false);
  const [count,setCount]=useState(0);
  const navigate=useNavigate();
  const [page,setPage]=useState(0);
//   let page=0;

function handlePrev(){
   setPage(Math.max(0,page-1))
    // postTweets();
}
function handleNext(){
    
    setPage(page+1)
    // postTweets();
}
useEffect(()=>{
    postTweets()
},[page])
async function postTweets()
{
    const res=await fetch('http://16.171.26.159:1337/api/pagination',{
        method:'POST',
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            page:page
        })
    })
    const data = await res.json()
    if (data.status === 'ok') {
        console.log(data.list)
        // data.list.reverse();
        setTweets(data.list)
        // if(data.list.length%12==1 && data.list.length!=1)handleNext();
    } else {
        alert(data.error)
    }
}
async function populateTweets() {
    const req = await fetch('http://16.171.26.159:1337/api/tweets', {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        },
    })

    const data = await req.json()
    if (data.status === 'ok') {
        console.log(data.list)
        // data.list.reverse()
        setTweets(data.list)
    } else {
        alert(data.error)
    } 
}

async function postTweet(){
    // setCount(count+1);
    const res=await fetch('http://16.171.26.159:1337/api/tweets',{
        method:'POST',
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            tweet:tweetInput,
            count:count
        })
    })
    const data = await res.json()
    if (data.status === 'ok') {
        console.log(data.list)
        data.list.reverse();
        setTweets(data.list.slice(0,12))
        setPage(0);
        setTweetInput('');
        // if(data.list.length%12==1 && data.list.length!=1)handleNext();
    } else {
        alert(data.error)
    }
} 

useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
        const user = jwt_decode(token)
        console.log(user);
        if(!user){
        localStorage.removeItem('token')
        navigate('/login')
        } else {
            populateTweets()
        }
    }
    // console.log("isTweetDeleted::",isTweetDeleted)
},[])

async function handleDelete(){
    const req = await fetch('http://16.171.26.159:1337/api/handleDelete', {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        },
    })
    const data = await req.json()
    if (data.status === 'ok') {
        console.log(data.list)
        // data.list.reverse()
        let temp=data.list.slice(page*12,Math.min(data.list.length,page*12+12));
        if(temp.length===0 && data.list.length>0){
            let pp=page-1;
            setPage(page-1);
            setTweets(data.list.slice(pp*12,Math.min(data.list.length,pp*12+12)))
        }
        else setTweets(temp)
    } else {
        alert(data.error)
    } 
}
useEffect(()=>{
    handleDelete()
},[isTweetDeleted])

  return (
    <div className='a002'>
        <   NavBar/>
    <div className='engulf'>
    <div className='prev' onClick={handlePrev}><GrPrevious/></div>
    <div className="tweets-list">
      {tweets.map((tweet) => (
        <Tweet key={tweet._id} id ={tweet._id} tweet={tweet} className="harshith" 
        isTweetDeleted={isTweetDeleted} 
        setIsTweetDeleted ={setIsTweetDeleted}
        tweets={tweets}
        setTweets={setTweets}
        page={page}
        />
        // JSON.stringify(tweet)
      ))}
      
    </div>
    <div className='next'onClick={handleNext}><GrNext/></div>
    </div>
    <form className='form'>
        <div className='post'>
        <input type="text" class="a000"value={tweetInput} onChange={(e)=>{setTweetInput(e.target.value)}} placeholder='AddNote'/>
        {/* <input type='button' class="a001"value='Add'onClick={postTweet}/> */}
        <BiSolidPlusCircle className="a001" onClick={postTweet}/>
        </div>
      </form>
    </div>
    
  );
};

export default TweetsList;

import { useEffect, useState } from 'react';
import axios from 'axios';
import './KidsView.css';

function KidsView() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:3001/api/savedVideos');
      setVideos(res.data);
    };
    fetch();
  }, []);

  return (
      <div className='kidsView'>
        {videos.map(v => (
          <iframe
            key={v.videoId}
            width="880"
            height="450"
            src={`https://www.youtube.com/embed/${v.videoId}?rel=0&modestbranding=1&controls=1&showinfo=0`}
            allowFullScreen
            frameborder="0"
            allow="autoplay; encrypted-media"
            title={v.title}
            style={{ borderRadius: 15, border: 'none'}}
          ></iframe>
        ))}
        <div className="sugestions">
            {videos.map(v => (  
                <div key={v.videoId} className="thumbnail">
                    <img src={v.thumbnail} alt="" width={"160px"} height={"106px"}/>
                    <div className='channel-info'>
                        <img src={v.thumbnail} alt="" />
                        <p>{v.title.slice(0,10)}...</p>
                    </div>
                    
                </div>
            ))}
        </div>
      </div>
  );
}

export default KidsView;

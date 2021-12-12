import './App.css';
import Navbar from './components/Navbar';
import { useEffect, useState } from "react";
import NewPost from './components/NewPost';


function App() {

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src=URL.createObjectURL(file);
      img.onload = ()=> {
        setImage({
          url:img.src,
          width:img.width,
          height:img.height,
        });
      };
    };

    file && getImage();
  }, [file]); 

  return (
    <div>
      <Navbar/>
      {image ? (<NewPost image={image}/>) : (

      
      <div className="newPostCard">
        <div className="addPost">
          <img
            src="https://images.unsplash.com/photo-1634127523572-4f7f58d2d710?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80"
            alt=""
            className="avatar"
          />
          <div className="postForm">
            <input type="text" 
              placeholder="let's put a smile  "
              className="postInput"
            />
            <label htmlFor="file">
              <img
                  className="addImg"
                  src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                  alt=""
                />
                <img
                  className="addImg"
                  src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                  alt=""
                />
                <button>Send</button>
            </label>
            <input 
            onChange={(e)=> setFile(e.target.files[0])}
            id="file" style={{display:"none"}} type="file" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;

import React from "react";
import Header from "./Header";
import { BG_URL, AVATAR_URL } from "../utils/constants";
import axios from "axios";
import { formatDate } from "../utils/helper";
const PostView = ({ post }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { createdAt, heading, description, imageUrl, addedBy } = post;
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/${addedBy}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(reqUrl);
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const date = formatDate(createdAt);

  return (
    <div className="relative h-screen overflow-hidden">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_URL}
          alt="Bg-Image"
          className="h-screen w-screen object-cover"
        />
      </div>

      <div className="relative z-10 bg-black bg-opacity-70 md:mx-auto h-screen  md:h-3/4 top-20 text-white w-screen md:w-4/5 shadow-2xl rounded-lg">
        <div className="w-full h-1/4 md:h-full flex flex-col md:flex-row">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-fill rounded-lg"
          />
          <div className="p-4 md:p-8">
            <div className="text-white flex justify-between  mt-2">
              <div className="flex flex-row gap-2 items-center ">
                <div className="rounded-full w-10 h-10">
                  <img
                    src={AVATAR_URL}
                    alt=""
                    className="rounded-full w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-white font-bold">{name}</div>
                  <div className="text-white font-semibold">{email}</div>
                </div>
              </div>

              <div>
                <p className="text-white font-semibold mt-2">
                  Published on {date}
                </p>
              </div>
            </div>

            <h1 className="text-[2rem] font-bold text-white mt-4 md:mt-8">
              {heading}
            </h1>
            <p className="text-white mt-2 md:mt-4 text-justify">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

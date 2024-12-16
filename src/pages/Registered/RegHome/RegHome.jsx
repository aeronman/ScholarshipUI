import React, { useEffect, useState } from "react";
import RegSideBar from "../common/regsidebar/RegSidebar";
import RegProfile from "../common/regprofile/regprofile";
import RegTotalScholars from "./components/RegTotalScholars/RegTotalScholars";
import RegTotalApplicants from "./components/RegTotalApplicants/RegTotalApplicants";
import RegMission from "./components/RegMission/RegMission";
import RegLineChart from "./RegLineChart/RegLineChart";
import VideoCallButton from "./components/VideoCallButton/VideoCallButton";
import ChatbotButton from "../../../components/PageWithChatbot";

import "./RegHome.css";
import "../common/allReg.css";

export default function RegHome() {
  const [facebookPosts, setFacebookPosts] = useState([]);

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      try {
        const pageId = "528014077055652"; 
        const accessToken = "EAADbfsGjyTwBO0VVzsLHA9p7zFUF3WdZC9Bt8PGSCkKYonLpHFD6HnU0YeLP0b6MWgIIzmKTQifqgApoZAzGZAgBLisaAxtBWfv1RIwZBY5lvIBp2fniVU8tDMh3cg85UZBD3suVjpTlk02peF6vk1fP9hITSZAMDQIs4GgFZC0MmOzMP3KIn7Y6XLhsgOZCZCsQ2TuEoqXKMMULFEuACJnmlZAb1IyNWagUUJdDZBfG4oU"; 
        const response = await fetch(
          `https://graph.facebook.com/v12.0/${pageId}/posts?access_token=${accessToken}`
        );
        const data = await response.json();
        if (data && data.data) {
          setFacebookPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching Facebook posts:", error);
      }
    };

    fetchFacebookPosts();
  }, []);

  return (
    <div className="RegHomeDiv1 ">
      <div className="RegHomeDiv1-1 ">
        <RegSideBar />
      </div>
      <div className="RegHomeDiv1-2 ">
        <div className="RegHomeDiv1-2-1">
          <RegProfile />
        </div>
        <div className="RegHomeDiv1-2-2 ">
          <div className="RegHomeDiv1-2-2-1 ">
            <div className="RegHomeDiv1-2-2-1-1">
              <RegTotalScholars />
            </div>
            <div className="RegHomeDiv1-2-2-1-1">
              <RegTotalApplicants />
            </div>
          </div>
          <div className="RegHomeDiv1-2-2-2">
            <RegMission />
          </div>
        </div>
        <div className="RegHomeDiv1-2-3 ">
        <h3>Latest Posts from Facebook</h3>
          <div className="facebook-posts">
            {facebookPosts.length > 0 ? (
              facebookPosts.map((post, index) => (
                <div key={index} className="facebook-post">
                  <p>{post.message || "No message content"}</p>
                  <span>{new Date(post.created_time).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
        <VideoCallButton />
        <ChatbotButton />
      </div>
    </div>
  );
}

import Ad from "./Ad";
import Video from "./Video";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./Loading";

const VideoList = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://3.38.67.46:8080/video/list");
        setVideos(response.data);
        console.log(videos);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Wrapper>로딩중</Wrapper>;
  }

  if (!videos) {
    return <div>데이터없다!</div>;
  }

  return (
    <Wrapper>
      <Ad />
      {videos.map((i) => (
        <Video index={i.videoIdx} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  row-gap: 10px;
  column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(285px, auto));
`;

export default VideoList;

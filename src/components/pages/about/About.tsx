import "../../scss/About.css";
// import { useState } from "react";

const About = () => {
  // const [l, setL] = useState();

  // useEffect(() => {
  //   console.log("Welcome to about page <3");
  //   //     User ID: 12737
  //   //     Token: RpuCYtAzEGyvP2eD
  //
  //   const getLyrics = async () => {
  //     const uid = "12737";
  //     const token = "RpuCYtAzEGyvP2eD";
  //
  //     const reqLyrics = await fetch(
  //       `https://www.stands4.com/services/v2/lyrics.php?uid=${uid}&tokenid=${token}&term=forever%20young&artist=Alphaville&format=xml`,
  //     );
  //
  //     console.log(reqLyrics);
  //
  //     const resLyrics = await reqLyrics.json();
  //
  //     console.log(resLyrics.results.result.song);
  //
  //     // console.log(resLyrics);
  //     setL(resLyrics);
  //   };
  //
  //   getLyrics();
  // }, []);

  return (
    <div className="about-route route-parent">
      {/* {l.results.result.song} */}
      <div className="about-header">What is it About?</div>
      <div className="about-description">
        I always love to download mp3 files from my app called “Videoder” and I
        realized that it is possible to lose my music files when my phone
        crashes or broke. So as a self-taught developer, I know that I can build
        my own website where I can store, stream, & download my music files
        😊👌.
      </div>
      <div className="about-watermark">
        OMO Music by Michael Gatmaitan, 2021
      </div>
    </div>
  );
};

export default About;

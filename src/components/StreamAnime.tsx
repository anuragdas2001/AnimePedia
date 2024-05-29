import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const StreamAnime = () => {
  const { anime, episode } = useParams();
  const [url] = useState("https://api-amvstrm.nyt92.eu.org/api/v2/stream");
  const [data, setData] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const [episodes, setEpisodes] = useState<number[]>([]);
  const [animeTitle, setAnimeTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchStream = async () => {
      if (anime && episode) {
        try {
          const formattedTitle = anime.toLowerCase().replace(/\s+/g, "-"); // Convert title to URL format
          const res = await axios.get(`${url}/${formattedTitle}-${episode}`);
          setData(res.data);
          console.log(res.data);
          setVideoUrl(res.data.nspl.main);
          setServers(res.data.iframe);
        } catch (error) {
          console.error("Error while Fetching", error);
        }
      }
    };

    const fetchAnimeDetails = async () => {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${anime}`);
        const animeData = res.data.data[0]; // Assuming the first result is the desired anime
        setAnimeTitle(animeData.title_english);
        const totalEpisodes = animeData.episodes;
        const episodeList = Array.from({ length: totalEpisodes }, (_, i) => i + 1);
        setEpisodes(episodeList);
        setThumbnail(animeData.images.jpg.large_image_url);
      } catch (error) {
        console.error("Error while fetching anime details", error);
      }
    };

    fetchStream();
    fetchAnimeDetails();
  }, [anime, episode]);

  const handleServerChange = (iframe:string) => {
    setVideoUrl(iframe);
  };
console.log(data)
  return (
    <>
      <div className="flex bg-gradient-to-r from-blue-900 via-purple-950 to-yellow-500 text-white">
        <div className="w-3/4 p-4">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              width="600"
              height="400"
              allowFullScreen
              frameBorder="0"
              className="mx-auto w-11/12 h-3/4 rounded-xl"
            ></iframe>
          ) : (
            <p>Loading...</p>
          )}
          <div className="flex flex-wrap justify-start mt-4">
            <h3 className="w-full text-lg font-bold mb-2">Select Server</h3>
            {servers.map((server:any, index) => (
              <button
                key={index}
                onClick={() => handleServerChange(server.iframe)}
                className="flex w-auto h-10 text-left px-4 py-2 mb-2 mx-2 border rounded-lg hover:bg-blue-700"
              >
                {server.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-5/12 p-4 h-screen overflow-y-auto ">
          <h2 className="text-xl font-bold mb-4">{animeTitle} Episodes</h2>
          <ul>
            {episodes.map((ep) => (
              <li key={ep} className="mb-4 flex items-center">
                <img
                  src={thumbnail}
                  alt={`Episode ${ep}`}
                  className="w-24 h-28 mr-2 rounded-lg "
                />
                <Link
                  to={`/StreamAnime/${anime}/episode-${ep}`}
                  className="text-white hover:underline"
                >
                  Episode {ep}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

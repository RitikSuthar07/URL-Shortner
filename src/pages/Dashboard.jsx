import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate(); // ✅ correct place

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [alias, setAlias] = useState("");
  const [expiry, setExpiry] = useState("");

  const fetchLinks = async () => {
    const res = await API.get("/url/my");
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleShorten = async () => {
    const res = await API.post("/url/shorten", {
      originalUrl: url,
      customAlias: alias,
      expiryDate: expiry,
    });

    setShortUrl(res.data.shortUrl);
    setUrl("");
    setAlias("");
    setExpiry("");
    fetchLinks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/url/${id}`);
    fetchLinks();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="mb-4 bg-black text-white px-4 py-1 rounded"
      >
        Logout
      </button>

      {/* Create URL */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-2">
        <input
          value={url}
          placeholder="Enter URL"
          className="border p-2 flex-1"
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          value={alias}
          placeholder="Custom alias (optional)"
          className="border p-2"
          onChange={(e) => setAlias(e.target.value)}
        />

        <input
          type="date"
          value={expiry}
          className="border p-2"
          onChange={(e) => setExpiry(e.target.value)}
        />

        <button
          onClick={handleShorten}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Shorten
        </button>
      </div>

      {/* Result */}
      {shortUrl && (
        <div className="mb-6">
          <p>
            Short URL:
            <span className="text-blue-600 ml-2">{shortUrl}</span>
          </p>
        </div>
      )}

      {/* Links List */}
      <div className="grid gap-4">
        {links.map((link) => (
          <div
            key={link._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{link.originalUrl}</p>
              <p className="text-blue-600">
                {`http://localhost:5000/${link.shortCode}`}
              </p>
              <p className="text-sm text-gray-500">
                Clicks: {link.clicks}
              </p>
            </div>

            <div className="flex gap-2">
              {/* ✅ Analytics Button (correct place) */}
              <button
                onClick={() => navigate(`/analytics/${link._id}`)}
                className="bg-purple-500 text-white px-3 py-1 rounded"
              >
                Analytics
              </button>

              <button
                onClick={() =>
                  copyToClipboard(`http://localhost:5000/${link.shortCode}`)
                }
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Copy
              </button>

              <button
                onClick={() => handleDelete(link._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Dashboard() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [links, setLinks] = useState([]);
//   const [alias, setAlias] = useState("");
//   const [expiry, setExpiry] = useState("");

//   const fetchLinks = async () => {
//     const res = await API.get("/url/my");
//     setLinks(res.data);
//   };
//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   const handleShorten = async () => {
//     const res = await API.post("/url/shorten", {
//       originalUrl: url,
//       customAlias: alias,
//       expiryDate: expiry,
//     });
//     setShortUrl(res.data.shortUrl);
//     setUrl("");
//     fetchLinks();
//   };

//   const handleDelete = async (id) => {
//     await API.delete(`/url/${id}`);
//     fetchLinks();
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied!");
//   };

//   return (
//     <div className="p-10 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           window.location.href = "/";
//         }}
//         className="mb-4 bg-black text-white px-4 py-1 rounded"
//       >
//         Logout
//       </button>

//       {/* Create URL */}
//       <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-2">
//         <input
//           value={url}
//           placeholder="Enter URL"
//           className="border p-2 flex-1"
//           onChange={(e) => setUrl(e.target.value)}
//         />

//         <input
//           placeholder="Custom alias (optional)"
//           className="border p-2"
//           onChange={(e) => setAlias(e.target.value)}
//         />

//         <input
//           type="date"
//           className="border p-2"
//           onChange={(e) => setExpiry(e.target.value)}
//         />

//         <button
//           onClick={() => navigate(`/analytics/${link._id}`)}
//           className="bg-purple-500 text-white px-3 py-1 rounded"
//         >
//           View Analytics
//         </button>

//         <button
//           onClick={handleShorten}
//           className="bg-blue-500 text-white px-4 rounded"
//         >
//           Shorten
//         </button>
//       </div>

//       {/* Result */}
//       {shortUrl && (
//         <div className="mb-6">
//           <p>
//             Short URL:
//             <span className="text-blue-600 ml-2">{shortUrl}</span>
//           </p>
//         </div>
//       )}

//       {/* Links List */}
//       <div className="grid gap-4">
//         {links.map((link) => (
//           <div
//             key={link._id}
//             className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
//           >
//             <div>
//               <p className="font-semibold">{link.originalUrl}</p>
//               <p className="text-blue-600">
//                 {`http://localhost:5000/${link.shortCode}`}
//               </p>
//               <p className="text-sm text-gray-500">Clicks: {link.clicks}</p>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() =>
//                   copyToClipboard(`http://localhost:5000/${link.shortCode}`)
//                 }
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Copy
//               </button>

//               <button
//                 onClick={() => handleDelete(link._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

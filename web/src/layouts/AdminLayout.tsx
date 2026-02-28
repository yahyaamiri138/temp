// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const AdminLayout = () => {
//   return (
//     <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
//       <Sidebar />
//       <div
//         className="d-flex flex-column flex-grow-1"
//         style={{ overflow: "hidden" }}
//       >
//         <Topbar />
//         <div className="flex-grow-1 p-3" style={{ overflow: "auto" }}>
//           <div className="container-fluid">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Topbar />
        <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

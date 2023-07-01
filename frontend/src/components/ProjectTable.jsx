import React from "react";
import {
  IconButton,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Description";

function ProjectTable({ projects, handleView, handleEdit, handleDelete }) {
  return (
    <Box>
      <Typography variant="h5">Project List</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.isClosed ? "Closed" : "Running"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleView(project._id)}>View</Button>
                  <Button onClick={() => handleEdit(project._id)}>Edit</Button>
                  <Button onClick={() => handleDelete(project._id)}>
                    Delete
                  </Button>
                  <Button>Generate report</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// function ProjectTable() {
//   const projects = [
//     { id: 1, name: "Project A", status: "open" },
//     { id: 2, name: "Project B", status: "closed" },
//     { id: 3, name: "Project C", status: "open" },
//   ];

//   const getStatusColor = (status) => {
//     return status === "open" ? "green" : "red";
//   };

//   const handleEdit = (projectId) => {
//     // Handle edit functionality here
//     console.log("Edit project with ID:", projectId);
//   };

//   const handleDelete = (projectId) => {
//     // Handle delete functionality here
//     console.log("Delete project with ID:", projectId);
//   };

//   const handleGenerateReport = (projectId) => {
//     // Handle report generation functionality here
//     console.log("Generate report for project with ID:", projectId);
//   };

//   return (
//     <Box display="flex" justifyContent="center">
//       <Table
//         striped
//         bordered
//         hover
//         responsive
//         style={{ maxWidth: "800px", fontSize: "16px" }}
//       >
//         <thead>
//           <tr>
//             <th>Project Name</th>
//             <th>Status</th>
//             <th>Action</th>
//             <th>Report</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project) => (
//             <tr key={project.id}>
//               <td>{project.name}</td>
//               <td>
//                 <span style={{ color: getStatusColor(project.status) }}>
//                   {project.status}
//                 </span>
//               </td>
//               <td>
//                 <IconButton onClick={() => handleEdit(project.id)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(project.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </td>
//               <td>
//                 <IconButton onClick={() => handleGenerateReport(project.id)}>
//                   <ReportIcon />
//                 </IconButton>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Box>
//   );
// }

export default ProjectTable;

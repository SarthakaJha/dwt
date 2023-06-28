async function Productcheck(req, res) {
    const { projectId, id } = req.params;
  
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
  
    const product = await Product.findById(
      { _id: id, project: projectId },
      { dailyReport: 0 }
    );
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    // Check if user has access to the project
    if (req.user.id.toString() !== project.user.toString()) {
      res.status(401);
      throw new Error("User not authorized to access this project");
    }
  
    // Check if product is already closed
    if (product.isClosed) {
      throw new Error("Product is now inactive");
    }
  }

  export default Productcheck;
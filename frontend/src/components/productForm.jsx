import { useState } from "react";
import {TextField,Button} from "@mui/material";


function ProductForm() {
  const [inputList, setInputList] = useState([
    { firstName: "", lastName: "", email: "", phone: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "", email: "", phone: "" }]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-4 fw-bold">ReactJS Add Remove Inputs Fields Dynamically</h5>

          {inputList.map((x, i) => {
            return (
              <div className="row mb-3" key={i}>
                <div className="col-md-3">
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={x.firstName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={x.lastName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    label="Email"
                    name="email"
                    value={x.email}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-md-3">
                  <TextField
                    label="Phone"
                    name="phone"
                    value={x.phone}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-md-2 mt-4">
                  {inputList.length !== 1 && (
                    <Button variant="contained" color="secondary" onClick={() => handleRemove(i)} style={{ marginBottom: 10 }}>
                      Remove
                    </Button>
                  )}
                  {inputList.length - 1 === i && (
                    <Button variant="contained" color="primary" onClick={handleAddClick}>
                      Add More
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
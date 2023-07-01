import { useState } from "react";
import { TextField, Button, Box, Grid, Divider } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function AddMoreInput() {
  const [inputList, setInputList] = useState([
    { Product_Name: "", Area: "", Angle: "", Direction: "", lat: "", lon: "" },
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
    setInputList([...inputList, { Product_Name: "", Area: "", Angle: "", Direction: "", lat: "", lon: "" }]);
  };

  const handlePredefinedValue = (index, predefinedValues) => {
    const list = [...inputList];
    const { Product_Name, Area, Angle, Direction,  lat, lon } = predefinedValues;
    list[index] = { Product_Name, Area, Angle, Direction,  lat, lon };
    setInputList(list);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "20px", paddingBottom: "40px" }}>
      <Box sx={{ width: "50%" }}>
        <h5 className="mt-3 mb-4 fw-bold">Material-UI Add Remove Inputs Fields Dynamically</h5>

        {inputList.map((x, i) => {
          return (
            <Box key={i} sx={{ marginBottom: "16px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Product Name"
                    name="Product_Name"
                    variant="outlined"
                    value={x.Product_Name}
                    onChange={(e) => handleInputChange(e, i)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Last Name"
                    name="Area"
                    variant="outlined"
                    value={x.Area}
                    onChange={(e) => handleInputChange(e, i)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Angle"
                    name="Angle"
                    variant="outlined"
                    value={x.Angle}
                    onChange={(e) => handleInputChange(e, i)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Phone"
                    name="Direction"
                    variant="outlined"
                    value={x.Direction}
                    onChange={(e) => handleInputChange(e, i)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Latitude"
                    name="lat"
                    variant="outlined"
                    value={x.lat}
                    onChange={(e) => handleInputChange(e, i)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Longitude"
                    name="lon"
                    variant="outlined"
                    value={x.lon}
                    onChange={(e) => handleInputChange(e, i)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                {inputList.length !== 1 && (
                  <Grid item xs={12} sm={3}>
                    <Button variant="contained" color="error" onClick={() => handleRemove(i)} size="small" fullWidth>
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid container spacing={2} mt={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handlePredefinedValue(i, {
                        Product_Name: "Berlin",
                        Area: "300",
                        Angle: "50",
                        Direction: "N",
                        lat: "40.7128",
                        lon: "-74.0060",
                      })
                    }
                    size="small"
                  >
                    Predefined 1
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handlePredefinedValue(i, {
                        Product_Name: "Leipzig",
                        Area: "200",
                        Angle: "15",
                        Direction: "S",
                        lat: "51.3396",
                        lon: "12.3713",
                      })
                    }
                    size="small"
                  >
                    Predefined 2
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handlePredefinedValue(i, {
                        Product_Name: "Dresden",
                        Area: "150",
                        Angle: "20",
                        Direction: "N",
                        lat: "51.0504",
                        lon: "13.7373",
                      })
                    }
                    size="small"
                  >
                    Predefined 3
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        })}

        <Divider sx={{ marginY: "16px" }} />

        <Grid container>
          <Grid item xs={12} sm={2} mt={4}>
            <Button variant="contained" color="success" onClick={handleAddClick} size="small" fullWidth>
              Add More
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flex: 1, height: "600px", marginLeft: "20px" }}>
        <MapContainer center={[50.8278, 12.9214]} zoom={4} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {inputList.map((x, i) => {
            const { lat, lon } = x;
            if (lat && lon) {
              const position = [parseFloat(lat), parseFloat(lon)];
              return <Marker key={i} position={position}></Marker>;
            }
            return null;
          })}
        </MapContainer>
      </Box>
    </Box>
  );
}

export default AddMoreInput;

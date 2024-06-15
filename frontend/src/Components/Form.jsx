import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Form() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    enrollnumber: "",
  });

  const [fetchedData, setFetchedData] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({
    _id: "",
    name: "",
    email: "",
    enrollnumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Values:", formValues);

    try {
      await axios.post("http://localhost:8000/api/users", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFormValues({
        name: "",
        email: "",
        enrollnumber: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      console.log(response.data);
      setFetchedData(response.data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (userData) => {
    setEditFormValues(userData);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormValues({
      ...editFormValues,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/users/${editFormValues._id}`,
        editFormValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchData();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);

      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enroll Number"
              name="enrollnumber"
              value={formValues.enrollnumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {fetchedData && fetchedData.length > 0 && (
        <Box mt={4} width="100%">
          <Typography variant="h6" gutterBottom>
            Employee Data:
          </Typography>
          {fetchedData.map((data, index) => (
            <Paper
              key={index}
              elevation={3}
              style={{ padding: "16px", marginBottom: "16px" }}
            >
              <Grid container alignItems="center">
                <Grid item xs={9}>
                  <Typography>
                    <strong>Name:</strong> {data.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {data.email}
                  </Typography>
                  <Typography>
                    <strong>Enroll Number:</strong> {data.enrollnumber}
                  </Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="flex-end">
                  <IconButton color="primary" onClick={() => handleEdit(data)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(data._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      )}

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Edit Employee Info</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={editFormValues.name}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={editFormValues.email}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Enroll Number"
            name="enrollnumber"
            value={editFormValues.enrollnumber}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Form;

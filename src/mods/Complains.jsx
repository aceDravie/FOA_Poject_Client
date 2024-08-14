import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { db } from "../helpers/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Complains = () => {
  const [tabValue, setTabValue] = useState(0);
  const [messages, setMessages] = useState({
    received: [],
    sent: [],
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({ subject: "", content: "" });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const complaintsRef = collection(db, "complaints");
    const sentQuery = query(complaintsRef, where("mode", "==", "sent"));
    const receivedQuery = query(complaintsRef, where("mode", "==", "received"));

    const [sentSnapshot, receivedSnapshot] = await Promise.all([
      getDocs(sentQuery),
      getDocs(receivedQuery),
    ]);

    const sentComplaints = sentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate().toISOString().split("T")[0],
    }));

    const receivedComplaints = receivedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate().toISOString().split("T")[0],
    }));

    setMessages({
      sent: sentComplaints,
      received: receivedComplaints,
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewMessage({ subject: "", content: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = async () => {
    if (newMessage.subject && newMessage.content) {
      try {
        const complaintsRef = collection(db, "complaints");

        const newComplaint = {
          subject: newMessage.subject,
          content: newMessage.content,
          date: serverTimestamp(),
          mode: "sent",
        };

        const docRef = await addDoc(complaintsRef, newComplaint);
        console.log("Complaint added with ID: ", docRef.id);

        await fetchComplaints();

        handleCloseDialog();
      } catch (error) {
        console.error("Error adding complaint: ", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3, marginTop: 10 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Complaints
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Received" />
        <Tab label="Sent" />
      </Tabs>

      {tabValue === 1 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{ mb: 3 }}
        >
          New Message
        </Button>
      )}

      <List>
        {messages[tabValue === 0 ? "received" : "sent"].map((message) => (
          <ListItem key={message.id} divider>
            <ListItemText
              primary={message.subject}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {message.content}
                  </Typography>
                  {` — ${message.date}`}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="outlined"
            value={newMessage.subject}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newMessage.content}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Complains;

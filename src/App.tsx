import './App.css';
import React, { useEffect, useState } from 'react';

import { Box, Button, Card, CardActions, CardContent, Grid, TextField, AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Note } from './interface/note';
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { addNewNote, deleteNote, getAllNotes, updateNotes } from './utils/fetchFromApi';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      _id: notes.length + 1,
      title: title,
      content: content
    };

    addNewNote(newNote);
    setTitle('');
    setContent('');
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content)
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) return;

    const updateNote: Note = {
      _id: selectedNote._id,
      title: title,
      content: content
    };

    updateNotes(updateNote);

    setTitle('');
    setContent('');
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };

  const handleDeleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    deleteNote(String(noteId));

  };

  useEffect(() => {
    getAllNotes()
      .then((notes) => {
        setNotes(notes);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [notes])

  return (
    <Box>
      <Box sx={{ marginBottom: '5rem' }}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Notes.
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 8, md: 16 }} sx={{ justifyContent: 'center' }}>
        <Grid item sm={8} md={4} sx={{ width: '100%' }}>
          <Box component='form' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }} onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              required
              onChange={(event) => setTitle(event.target.value)}
              sx={{ width: '100%' }}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Content"
              multiline
              rows={4}
              variant="outlined"
              value={content}
              required
              onChange={(event) => setContent(event.target.value)}
              fullWidth
            />
            {
              selectedNote ?
                (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }} >
                    <Button type='submit' variant="contained" color="success" endIcon={<FaSave />}>Save</Button>
                    <Button variant="contained" color="error" endIcon={<TiCancel />} onClick={handleCancel}>Cancel</Button>
                  </Box>
                ) : (
                  <Button type='submit' variant="contained" endIcon={<FaPlus />}>Add Note</Button>
                )
            }
          </Box>
        </Grid>
        <Grid item sm={8} md={12}>
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'center', alignItems: 'center', paddingX: '1rem' }}>
            {
              notes.length ? (
                notes.map((note) => (
                  <Grid item sm={4} md={4} key={note._id}>
                    <Card sx={{ minWidth: 275 }} onClick={() => handleSelectNote(note)}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {note.title}
                        </Typography>
                        <Typography variant="body2">
                          {note.content}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant='outlined' endIcon={<FaTrashAlt />} onClick={(event) => handleDeleteNote(event, note._id)}>Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))

              ) : (
                <Grid item sm={4} md={4}>
                  <h1>No notes to show</h1>
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

export default App;
import './App.css';
import React, { useState } from 'react';

import { Box, Button, Card, CardActions, CardContent, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Note } from './interface/note';
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    };

    setNotes([newNote, ...notes]);
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
      id: selectedNote.id,
      title: title,
      content: content
    };

    const updateNoteList = notes.map((note) => (
      note.id === selectedNote.id ? updateNote : note
    ));

    setNotes(updateNoteList);
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

    const updatedNotes = notes.filter(
      (note) => note.id !== noteId
    );

    setNotes(updatedNotes);
  };

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 8, md: 16 }}>
        <Grid item sm={8} md={4}>
          <Box component='form' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }} onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              required
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              id="filled-multiline-flexible"
              label="Content"
              multiline
              rows={10}
              variant="outlined"
              value={content}
              required
              onChange={(event) => setContent(event.target.value)}
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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 4, md: 12 }}>
            {
              notes.length ? (
                notes.map((note) => (
                  <Grid item sm={4} md={4}>
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
                        <Button variant='outlined' endIcon={<FaTrashAlt />} onClick={(event) => handleDeleteNote(event, note.id)}>Delete</Button>
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
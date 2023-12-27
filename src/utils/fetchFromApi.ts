import axios from 'axios';
import { Note } from '../interface/note';

const BASE_URL: string = "http://localhost:5000/api";

export const getAllNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notes`, { responseType: 'json' });

        if (response.status !== 200) {
            throw new Error(response.data);
        }

        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
};

export const deleteNote = async (_id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deleteNote/${_id}`);

        if (response.status !== 200) {
            throw new Error('Delete request failed');
        }

    } catch (error) {
        console.error('Error', error);
    }
};

export const addNewNote = async (note: Note) => {
    try {
        const response = await axios.post(`${BASE_URL}/newNote`, note);

        if (response.status !== 200) {
            throw new Error('Post request failed');
        }

    } catch (error) {
        console.error('Error', error);
    }
}

export const updateNotes = async (note: Note) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateNote`, note);

        if (response.status !== 200) {
            throw new Error('Put request failed');
        }

    } catch (error) {
        console.error('Error', error);
    }
}



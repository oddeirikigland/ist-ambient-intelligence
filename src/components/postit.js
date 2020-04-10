import React, { useState, useContext } from "react";
import ReactStickies from "react-stickies";
import axios from "axios";

import { PersonContext } from "../PersonContextProvider";

function Postit() {
  const personContext = useContext(PersonContext);

  const [state, setState] = useState({
    notes: [],
    grid: {
      w: 2,
      h: 2,
      isResizable: false,
      isDragable: false,
    },
    person: "nothing",
  });

  const getNotes = () => {
    const URL = process.env.REACT_APP_API_URL + `notes/`;
    const AUTH_STR = process.env.REACT_APP_API_AUTH;
    return axios
      .get(URL, {
        headers: {
          Authorization: AUTH_STR,
        },
      })
      .then((response) => {
        const result = response.data.results.find(
          (element) => element.person === personContext.person.name
        );
        if (result) {
          return JSON.parse(result.notes);
        }
        return [];
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const postNotes = (notes) => {
    const URL = process.env.REACT_APP_API_URL + `notes/`;
    const AUTH_STR = process.env.REACT_APP_API_AUTH;
    axios
      .post(
        URL,
        {
          person: personContext.person.name,
          notes: JSON.stringify(notes),
        },
        {
          headers: {
            Authorization: AUTH_STR,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const onSave = () => {
    // Make sure to delete the editorState before saving to backend
    const notes = state.notes;
    notes.map((note) => {
      delete note.editorState;
    });
    // Make service call to save notes
    postNotes(notes);
  };

  const onChange = (notes) => {
    // Only possible to have one note
    console.log(notes);
    setState((state) => ({
      ...state,
      notes: [notes[0]],
    }));
  };

  if (state && state.notes && personContext.person.name !== state.person) {
    getNotes().then((res) => {
      setState((state) => ({
        ...state,
        notes: res,
        person: personContext.person.name,
      }));
    });
  }

  return (
    <div>
      <ReactStickies
        noteHeaderStyle={{ opacity: 0 }}
        notes={state.notes}
        onChange={onChange}
        title={false}
        grid={state.grid}
      />
      <button onClick={onSave} style={{ display: "block", margin: "6px auto" }}>
        Save note
      </button>
    </div>
  );
}

export default Postit;

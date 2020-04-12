import React from "react";
import ReactStickies from "react-stickies";
import axios from "axios";

import { PersonContext } from "../PersonContextProvider";

const postNotes = (notes, person) => {
  const URL = process.env.REACT_APP_API_URL + `notes/`;
  const AUTH_STR = process.env.REACT_APP_API_AUTH;
  axios
    .post(
      URL,
      {
        person,
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

class Postit extends React.Component {
  static personContext = PersonContext;
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      grid: {
        w: 2,
        h: 2,
        isResizable: false,
        isDragable: false,
      },
      person: "nothing",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const person = this.props.context.person.name;
    this.getNotes(person);
    this.setState({
      person,
    });
  }

  componentDidUpdate() {
    const person = this.props.context.person.name;
    if (person !== this.state.person) {
      this.getNotes(person);
      this.setState({
        person,
      });
    }
  }
  getNotes(person) {
    const URL = process.env.REACT_APP_API_URL + `notes/`;
    const AUTH_STR = process.env.REACT_APP_API_AUTH;
    axios
      .get(URL, {
        headers: {
          Authorization: AUTH_STR,
        },
      })
      .then((response) => {
        const result = response.data.results.find(
          (element) => element.person === person
        );
        if (result) {
          this.onChange(JSON.parse(result.notes));
        } else {
          this.onChange(
            JSON.parse(
              '[{"grid":{"w":2,"h":2,"x":0,"y":null,"i":"0ccf3ebc-2bc1-ce9a-9f29-0cbff2a49cf8","moved":false,"static":false},"id":"0ccf3ebc-2bc1-ce9a-9f29-0cbff2a49cf8","title":"Title","color":"#FBE4BE","degree":"-1deg","timeStamp":"Apr 10, 2020 8:49 PM","contentEditable":true,"text":""}]'
            )
          );
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  onSave() {
    // Make sure to delete the editorState before saving to backend
    const notes = this.state.notes;
    notes.map((note) => {
      delete note.editorState;
      return note
    });
    // Make service call to save notes
    postNotes(notes, this.state.person);
  }
  onChange(notes) {
    this.setState({
      // Only possible to have one note
      notes: [notes[0]],
    });
  }
  render() {
    return (
      <div>
        <ReactStickies
          noteHeaderStyle={{ opacity: 0 }}
          notes={this.state.notes}
          onChange={this.onChange}
          title={false}
          grid={this.state.grid}
        />
        <button
          onClick={this.onSave}
          style={{ display: "block", margin: "6px auto" }}
        >
          Save note
        </button>
      </div>
    );
  }
}

export default (props) => (
  <PersonContext.Consumer>
    {(state) => <Postit context={state} />}
  </PersonContext.Consumer>
);

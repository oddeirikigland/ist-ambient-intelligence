import React from "react";
import ReactStickies from "react-stickies";
import axios from "axios";

import { PersonContext } from "../PersonContextProvider";
import AwesomeSpinner from "./awesomeSpinner";

const URL = process.env.REACT_APP_API_URL + `notes/`;
const AUTH_STR = process.env.REACT_APP_API_AUTH;

const postNotes = (notes, person) => {
  return axios
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
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount() {
    let person = this.props.context.person.name;
    if (this.props.type === "shared") {
      person = "shared";
    }
    this.getNotes(person);
    this.setState({
      person,
    });
  }

  componentDidUpdate() {
    let person = this.props.context.person.name;
    if (this.props.type === "shared") {
      person = "shared";
    }
    if (person !== this.state.person) {
      this.getNotes(person);
      this.setState({
        person,
      });
    }
  }
  getNotes(person) {
    this.setState({ loading: true }, () => {
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
                '[{"grid":{"w":2,"h":2,"x":0,"y":null,"i":"0ccf3ebc-2bc1-ce9a-9f29-0cbff2a49cf8","moved":false,"static":false},"id":"0ccf3ebc-2bc1-ce9a-9f29-0cbff2a49cf8","title":"Title","color":"#E4FABC","degree":"-1deg","timeStamp":"Apr 10, 2020 8:49 PM","contentEditable":true,"text":""}]'
              )
            );
          }
          this.setState({
            loading: false,
          });
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    });
  }

  onSave() {
    this.setState({ loading: true }, () => {
      const notes = this.state.notes;
      notes.map((note) => {
        delete note.editorState;
        return note;
      });
      postNotes(notes, this.state.person).then(() =>
        this.setState({
          loading: false,
        })
      );
    });
  }
  onChange(notes) {
    this.setState({
      // Only possible to have one note
      notes: [notes[0]],
    });
  }
  render() {
    return (
      <div
        style={{ width: "180px", display: "inline-block", textAlign: "center" }}
      >
        <h3 className="comp-header">{this.props.title}</h3>
        <ReactStickies
          noteHeaderStyle={{ opacity: 0 }}
          notes={this.state.notes}
          onChange={this.onChange}
          title={false}
          grid={this.state.grid}
        />
        {this.state.loading ? (
          <AwesomeSpinner />
        ) : (
          <button
            onClick={this.onSave}
            style={{ display: "block", margin: "6px auto" }}
          >
            Save note
          </button>
        )}
      </div>
    );
  }
}

export default (props) => (
  <PersonContext.Consumer>
    {(state) => (
      <Postit context={state} title={props.title} type={props.type} />
    )}
  </PersonContext.Consumer>
);

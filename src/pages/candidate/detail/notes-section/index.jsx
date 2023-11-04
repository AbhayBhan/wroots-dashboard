import Noteform from "./note-form";
import Noteslist from "./notes-list";
import { useMutation } from "@tanstack/react-query";
import { addNote, getAllNotes } from "@/services/notes";
import { useEffect, useState } from "react";
import Spinner from "@/components/organism/spinner";

const NotesSection = ({ candidateId }) => {
  const recruiterId = JSON.parse(localStorage.getItem("userdata")).id;
  const [notesList, setNotesList] = useState([]);
  const { mutate, isLoading } = useMutation(getAllNotes, {
    onSuccess: ({ data }) => setNotesList(data?.newNote?.records),
  });

  const {mutate : addMutate, isLoading : submitLoading} = useMutation(addNote, {
    onSuccess : () => mutate(candidateId)
  });

  const submitNote = (noteString) => {
    addMutate({
      candidateId,
      recruiterId, 
      noteString
    })
  };

  useEffect(() => {
    mutate(candidateId);
  }, []);
  return (
    <>
      <Noteform submitNote={submitNote} isLoading={submitLoading} />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Noteslist notesList={notesList} />
      )}
    </>
  );
};

export default NotesSection;

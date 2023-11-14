import { ScrollArea } from "@/components/ui/scroll-area";
import { TbNotes } from "react-icons/tb";
import { formatTimestamp } from "@/utils/dateTime";


const Noteslist = ({notesList}) => {

  return (
    <ScrollArea className=" w-full mt-3 ">
      <h4 className="mb-4 text-sm font-medium leading-none">Previous Notes</h4>
      <div className="space-y-2">
        {notesList?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </ScrollArea>
  );
};

const NoteCard = ({ note }) => (
  <article className="p-3 text-sm border rounded-lg text-muted-foreground">
    <div className="flex gap-2">
      <TbNotes size={24} />
      <p>{note.noteString}</p>
    </div>
    <p className="italic text-right ">~{note.recruiter_name} <span className="ml-1">{formatTimestamp(note.createdOn)}</span></p>
  </article>
);

export default Noteslist;

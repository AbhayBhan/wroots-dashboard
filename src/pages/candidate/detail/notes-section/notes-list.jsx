import { ScrollArea } from "@/components/ui/scroll-area";
import { noteData } from "@/data/candidate";
import mockData from "@@/db.json";
import { TbNotes } from "react-icons/tb";


const Noteslist = () => {
  // const { data, isLoading } = useQuery({
  //   queryFn: getAllNotes,
  //   queryKey: ["All-Notes"],
  //   keepPreviousData: true,
  // });

  return (
    <ScrollArea className=" w-full mt-3 ">
      <h4 className="mb-4 text-sm font-medium leading-none">Previous Notes</h4>
      <div className="space-y-2">
        {noteData.map((note) => (
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
      <p>{note.description}</p>
    </div>
    <p className="italic text-right ">~{note.author} <span>12th Jan 2023</span></p>
  </article>
);

export default Noteslist;

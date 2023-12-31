import Spinner from "@/components/organism/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatTimestamp } from "@/utils/dateTime";
import { FaTrash } from "react-icons/fa";

const Processinglist = ({ data , deleteProcess }) => {
  return (
    <ScrollArea className=" w-full mt-3 ">
      <h4 className="mb-4 text-sm font-medium leading-none">
        Previous Process
      </h4>
      <div className="space-y-2">
        {data?.map((process) => (
          <Card key={process.id} data={process} deleteProcess={deleteProcess} />
        ))}
      </div>
    </ScrollArea>
  );
};

const Card = ({ data,deleteProcess }) => (
  <article className="p-3  text-sm gap-2 border rounded-lg text-muted-foreground">
    <div className="flex_between">
      <div className="flex flex-col">
        <p className="text-foreground font-medium">{data?.role?.name}</p>
        <p>{data?.company?.name}</p>
      </div>
      <div className="flex flex-col">
        <p>{data?.processingStatus?.name}</p>
      </div>
    </div>
    <div className="flex_between mt-2">
      <p className="text-xs ">Updated by {data?.recruiter?.name}</p>
      <p className="text-xs">Updated on {formatTimestamp(data?.updatedAt)}</p>
    </div>
    <div className="mt-2">
      <button onClick={() => deleteProcess(data.id)}>
        <FaTrash color="red" />
      </button>
    </div>
  </article>
);

export default Processinglist;

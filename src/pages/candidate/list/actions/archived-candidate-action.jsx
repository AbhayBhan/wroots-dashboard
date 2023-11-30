import { buttonVariants } from "@/components/ui/button";
import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const ArchivedCandidateAction = ({row}) => {
    const currentdivId = `allCandidate-${row?.id}`;
    const { saveRowPosition } = useScroll(currentdivId);
  
    return (
      <div className="gap-2 flex_end" id={currentdivId}>
        <Link
          to={`/candidate/${row.id}/details`}
          // className="hidden h-8 ml-auto lg:flex"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "hover:bg-muted "
          )}
          onClick={saveRowPosition}
          title="Detail View"
        >
          <EyeOpenIcon className="w-5 h-5 text-slate-500" />
        </Link>
      </div>
    );
}

export default ArchivedCandidateAction
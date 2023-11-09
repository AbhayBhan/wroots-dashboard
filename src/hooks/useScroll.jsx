import { useEffect } from "react";

const useScroll = (id) => {
  const saveRowPosition = () => {
    sessionStorage.setItem("currentCandidateRowId", id);
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("currentCandidateRowId");
    if (scrollPosition) {
      const lastActiveRow = document.getElementById(scrollPosition);
      lastActiveRow?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);
  return { saveRowPosition };
};

export default useScroll;

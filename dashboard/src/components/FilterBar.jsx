import React, {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

export default function FilterBar(){
  const [os,setOs] = useState("");
  const qc = useQueryClient();
  return (
    <div>
      <label>OS:</label>
      <select value={os} onChange={e=>setOs(e.target.value)}>
        <option value="">All</option>
        <option>Windows</option>
        <option>Linux</option>
        <option>Darwin</option>
      </select>
      <button onClick={()=>qc.invalidateQueries(["machines",os])}>
        Apply
      </button>
    </div>
  );
}

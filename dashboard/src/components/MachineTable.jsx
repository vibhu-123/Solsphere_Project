import React from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchMachines} from "../api.js";

export default function MachineTable(){
  // React-Query key includes os filter
  const {data,isLoading} = useQuery(
    ["machines", ""],
    ()=>fetchMachines("")
  );

  if(isLoading) return <div>Loading...</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Machine</th>
          <th>Last Seen</th>
          <th>Disk Enc</th>
          <th>OS Up-to-date</th>
          <th>AV OK</th>
          <th>Sleep Min</th>
        </tr>
      </thead>
      <tbody>
        {data.map(m=>(
          <tr key={m.machine_id} style={{backgroundColor:(!m.disk_encrypted||!m.os_up_to_date)?"#fdd":""}}>
            <td>{m.machine_id}</td>
            <td>{new Date(m.ts).toLocaleString()}</td>
            <td>{m.disk_encrypted?"Yes":"No"}</td>
            <td>{m.os_up_to_date?"Yes":"No"}</td>
            <td>{m.antivirus_ok?"Yes":"No"}</td>
            <td>{m.sleep_timeout_min}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

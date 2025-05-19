export async function fetchMachines(osFilter=""){
  const q = osFilter ? `?os=${osFilter}` : "";
  const res = await fetch("https://api.myserver.com/machines"+q,{
    headers:{Authorization:`Bearer ${localStorage.getItem("API_KEY")}`}
  });
  if(!res.ok) throw new Error("Fetch error");
  return res.json();
}

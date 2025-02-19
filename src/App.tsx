import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { TAssignment } from "./shared/types";

function App() {
  const [assignments, setAssignments ]= useState<TAssignment[]>([])
   console.log(`assignments: `,assignments);
   
   return (
    <>
      <Header
         setAssignments={setAssignments} />
      <Assignments 
         assignments={assignments}
         setAssignments={setAssignments}/>
    </>
  );
}

export default App;

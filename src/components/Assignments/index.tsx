import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { TAssignment } from "../../shared/types";
import { useState } from "react";

type AssignmentsProps = {
   assignments: TAssignment[],
   setAssignments: React.Dispatch<React.SetStateAction<TAssignment[]>>
}

export function Assignments({assignments,setAssignments}: AssignmentsProps) {
   const [countCompleted, setCountCompleted] = useState<number>(0)

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{countCompleted} of {assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>
         {assignments.map((item:TAssignment)=>(
             <Assignment 
               key={item.id}
               assignment={item}
               setAssignments={setAssignments}
               setCountCompleted={setCountCompleted}/>
         ))}
       
      </div>
    </section>
  );
}

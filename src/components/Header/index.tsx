import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { FormEvent, useState } from 'react'
import { TAssignment } from "../../shared/types";

type THeader = {
   assnname: string,
   duedate: string,
}
type HeaderProps = {
   setAssignments: React.Dispatch<React.SetStateAction<TAssignment[]|[]>>
}
export function Header({setAssignments}: HeaderProps) {

   const [assn, setAssn ]= useState<THeader>({
      assnname:'',
      duedate:''
   })

   function emptyInputs():boolean {
      return !assn.assnname || !assn.duedate
   }
   function handleSubmitAdd(e:React.FormEvent){
      e.preventDefault()

      setAssignments((preAssns:TAssignment[]|[])=>{
         const newAssn = {
            id: crypto.randomUUID(),
            assnname: assn.assnname,
            duedate: assn.duedate,
            isCompleted: false
         }
         return preAssns ? [newAssn, ...preAssns] :[]
      })


      setAssn({assnname:'',duedate:''})
   }
  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form 
         className={styles.newAssignmentForm}
         onSubmit={handleSubmitAdd}>
        <input 
            placeholder="Add a new assignment" 
            type="text"
            name="assnname"
            value={assn.assnname}
            onChange={(e)=>setAssn((preAssn)=>({...preAssn, assnname:e.target.value}))} />
        <input 
            type="date"
            name="duedate"
            value={assn.duedate}
            onChange={(e)=>setAssn((preAssn)=>({...preAssn, duedate:e.target.value}))} />

        <button
         disabled={emptyInputs()}
         style={emptyInputs() ? {cursor:"not-allowed", backgroundColor:"lightgray"} :{cursor:"pointer"}}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}

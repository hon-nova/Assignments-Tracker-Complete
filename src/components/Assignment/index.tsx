import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { TAssignment } from "../../shared/types";
import { IoMdCheckmarkCircle } from "react-icons/io";

type AssignmentProps = {
  assignment: TAssignment,
  setAssignments: React.Dispatch<React.SetStateAction<TAssignment[]>>
  setCountCompleted: React.Dispatch<React.SetStateAction<number>>
}
export function Assignment({assignment, setAssignments, setCountCompleted}:AssignmentProps) {
	
	console.log(`assignment.isCompleted: `,assignment.isCompleted);
	
	function onDelete(id:string){
		// alert(`onDelete got hit`)
		setAssignments((preAssns:TAssignment[]|[])=>{
			const updateAssns = preAssns.filter((item:TAssignment)=>item.id!==id)

			const updateCount = updateAssns.filter((item:TAssignment)=>item.isCompleted).length
			setCountCompleted(updateCount)

			return preAssns ? updateAssns : []
		})
	}
	function onCheckedCompleted(id:string){
		// alert(`onCheckedCompleted got triggered!`)
		setAssignments((preAssns:TAssignment[]|[])=>{
			const updateAssnsWithCheckedCompleted =  preAssns.map((item:TAssignment)=>item.id===id ? {...item, isCompleted: !item.isCompleted}:item)

			const updateCount = updateAssnsWithCheckedCompleted.filter((item:TAssignment)=>item.isCompleted).length
			setCountCompleted(updateCount)

			return preAssns ?  updateAssnsWithCheckedCompleted :[]
		})
	}
	function formatDay(duedate: string) {
      const dueDateMs = new Date(duedate).setHours(0, 0, 0, 0); 
      const todayMs = new Date().setHours(0, 0, 0, 0);
  
      const diffInDays = Math.ceil((dueDateMs - todayMs) / (24 * 60 * 60 * 1000));
      return diffInDays;
   }

   const showDueDate = {
      text:'',
      styles: {}
   }
   
   if(formatDay(assignment.duedate)>1){
      showDueDate.text = `Due: ${(formatDay(assignment.duedate))} days`;
      showDueDate.styles = { backgroundColor: "green", color: "black" }; 
   } else if (formatDay(assignment.duedate)===1){
      showDueDate.text = `Due: tomorrow`;
      showDueDate.styles = { backgroundColor: "red", color: "black" };
   } else {
      showDueDate.text = "Due: Now";
      showDueDate.styles= { backgroundColor: "gray", color: "white" };
   }

  return (
    <div className={styles.assignment}>
      <button 
			className={styles.checkContainer}
			onClick={()=>onCheckedCompleted(assignment.id)}>
        {assignment.isCompleted? < IoMdCheckmarkCircle/> : <div />}
      </button>

      <p className={assignment.isCompleted ? styles.textCompleted : ''}>{assignment.assnname}</p>

		<div className={styles.duedate} style={showDueDate.styles}>
        <span>{showDueDate.text}</span>
      </div>

      <button 
			className={styles.deleteButton}
			onClick={()=>onDelete(assignment.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}

export type TAssignment = {
	id: string,
	assnname: string,
	duedate: string,
	isCompleted: boolean
}
export type AssignmentsProps = {
	assignments: TAssignment[],
	setAssignments: React.Dispatch<React.SetStateAction<TAssignment[]>>
}
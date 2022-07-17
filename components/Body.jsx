import AddVoter from "./AddVoter";
import GetVoter from "./GetVoter";
import WorkflowStatus from "./WorkflowStatus";

export default function Body() {
    return(
        <div>
            <AddVoter/>
            <GetVoter/>
            <WorkflowStatus/>
        </div>
    )
}

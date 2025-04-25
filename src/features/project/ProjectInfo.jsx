import { useEffect, useState } from "react";
import PartList from "./part/PartList";
import { getProjectInfoAPI } from "./ProjectAPI";
import { Flex, Box } from "@chakra-ui/react"; 

const ProjectInfo = ({projectId}) => {
    const [projectData, setProjectData] = useState({});

    //React Hook : Component가 렌더링 될때 실행
    useEffect(()=>{
        const response = getProjectInfoAPI(projectId);
        if(response.data){
            setProjectData(response.data);
        }
    })


    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box>
                    <PartList parts={projectData.parts}/>
                </Box>
                <Box>
                    <PartList parts={projectData.parts}/>
                </Box>
                <Box>
                    <PartList parts={projectData.parts}/>
                </Box>
            </Flex>
        </>
    )
}

export default ProjectInfo;
import { useEffect, useState } from "react";
import PartList from "./part/PartList";
import MemberList from "./member/MemberList";
import { getProjectInfoAPI } from "./projectAPI";
import { Flex, Box } from "@chakra-ui/react"; 

const ProjectInfo = ({projectId}) => {

    const [projectData, setProjectData] = useState({});

    //React Hook : Component가 렌더링 될때 실행
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getProjectInfoAPI(projectId);
            if (response.data) {
              setProjectData(response.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, [projectId]);


    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='10' mt='10'>
                <Box ml='10'>
                    <PartList parts={projectData.parts} projectId={projectId} />
                </Box>
                <Box>
                    <MemberList members={projectData.projectMembers} projectId={projectId} />
                </Box>
            </Flex>
        </>
    )
}

export default ProjectInfo;
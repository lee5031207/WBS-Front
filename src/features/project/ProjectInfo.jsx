import { useEffect, useState } from "react";
import PartList from "./part/PartList";
import MemberList from "./member/MemberList";
import { getProjectInfoAPI } from "./projectAPI";
import { Flex, Box, Card, CardHeader, Heading, CardBody, TableContainer, Table, TableCaption, Tbody,
  Tr, Td } from "@chakra-ui/react"; 
import { getPartListAPI } from "./part/partAPI";
import { getMemberListAPI } from "./member/memberAPI";

const ProjectInfo = ({projectId}) => {

    const [projectData, setProjectData] = useState({});
    const [partList, setPartList] = useState([]);
    const [memberList, setMemberList] = useState([]);

    //React Hook : Component가 렌더링 될때 실행
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [projectRes, partRes, memberRes] = await Promise.all(
              [
                getProjectInfoAPI(projectId),
                getPartListAPI(projectId),
                getMemberListAPI(projectId)
              ]
            )
            if(projectRes.data){
              setProjectData(projectRes.data);
            }
            if(partRes.data){
              setPartList(partRes.data);
            }
            if(memberRes.data){
              setMemberList(memberRes.data);
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
                  <Card w="30vw" h="80vh" ml='10'>
                    <CardHeader>
                    <Flex justify="space-between" align="center">
                        <Heading size="md">프로젝트 정보</Heading>
                    </Flex>
                    </CardHeader>
                    <CardBody>
                      <TableContainer>
                        <Table variant='simple' size='sm'>
                          <TableCaption>{projectData.projectName} 정보</TableCaption>
                            <Tbody>
                              <Tr>
                                  <Td>프로젝트 명</Td>
                                  <Td>{projectData.projectName}</Td>
                              </Tr>
                              <Tr>
                                  <Td>프로젝트 설명</Td>
                                  <Td>{projectData.projectDesc}</Td>
                              </Tr>
                              <Tr>
                                  <Td>시작일</Td>
                                  <Td>{projectData.startDt}</Td>
                              </Tr>
                              <Tr>
                                  <Td>종료일</Td>
                                  <Td>{projectData.endDt}</Td>
                              </Tr>
                              <Tr>
                                  <Td>주관 부서</Td>
                                  <Td>{projectData.team?.teamNm}</Td>
                              </Tr>
                            </Tbody>
                        </Table>
                      </TableContainer>
                    </CardBody>
                  </Card>
                </Box>
                <Box>
                    <PartList 
                      parts={partList}
                      onCreatePart={setPartList} 
                      projectId={projectId} 
                    />
                </Box>
                <Box>
                    <MemberList 
                      members={memberList} 
                      onCreateMember={setMemberList} 
                      onUpdateMember={setPartList}
                      projectId={projectId}
                    />
                </Box>
            </Flex>
        </>
    )
}

export default ProjectInfo;
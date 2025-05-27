import {
    Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Table, TableCaption,
    TableContainer, Tbody, Td, Text, Tfoot, Thead, Tr, useDisclosure, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getProjectRoleKR, getProjectRoles } from "../../../utils/commonUtils";
import { getPartListAPI } from "../part/partAPI";
import { getMemberDetailAPI, updateMemberAPI } from "./memberAPI";

const MemberInfo = ( {userNm, teamNm, projectId, prjMemId, onUpdate} ) => {

    const projectRoles = getProjectRoles();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [ memberInfo, setMemberInfo ] = useState(null);
    const [ partList, setPartList] = useState([]);

    const closeModal = async() => {
        onClose();
        setMemberInfo(null);
        setPartList([]);
    }


    const getMemberDetail = async () => {
        try{
            const response = await getMemberDetailAPI(projectId, prjMemId);
            if(response.data){
                setMemberInfo(response.data);
            }
        }catch(error){
            toast({
                title: "프로젝트 멤버 정보",
                description: "프로젝트 멤버 정보 결과가 없습니다.",
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            })
        }
    }

    const getPartList = async () => {
        try{
            const response = await getPartListAPI(projectId);
            if(response.data){
                setPartList(response.data);
            }

        }catch(error){
            toast({
                title: "프로젝트 Part 정보",
                description: "프로젝트 Part 정보 결과가 없습니다.",
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            })
        }
    }

    const updateMember = async () => {

        const body = {
            projectRole : memberInfo.projectRole,
            partId : memberInfo.part.partId
        }
        console.log(body);

        try{
            const response = await updateMemberAPI(projectId, prjMemId, body);
            if(response.data){
                toast({
                    title: "프로젝트 멤버 정보",
                    description: response.data.user.userNm+" 정보 업데이트 완료" ,
                    status: 'success',
                    duration: 3000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
                })
                setMemberInfo(response.data);
                onUpdate();
                closeModal();
            }

        }catch(error){
            toast({
                title: "프로젝트 멤버 수정",
                description: "프로젝트 멤버 수정 실패.",
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            })
        } 
    }

    return (
        <>
            <Box as="span" flex="1" textAlign="left" onClick={() => {
                getMemberDetail();
                getPartList();
                onOpen();
            }}>
                {userNm} [{teamNm}]
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent minH="300px">
                    <ModalHeader>프로젝트 멤버 정보</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {memberInfo ? (
                        <Card width='100%' height='100%'>
                            <CardHeader>
                                <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar bg='brand.100'/>
                                    <Box>
                                    <Heading size='sm'>{memberInfo.user.userNm}</Heading>
                                    <Text>{memberInfo.user.teamNm}</Text>
                                    </Box>
                                </Flex>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <TableContainer>
                                    <Table variant='simple' size='sm'>
                                        <TableCaption>{memberInfo.project.projectName} 멤버 정보</TableCaption>
                                        <Thead></Thead>
                                        <Tbody>
                                        <Tr>
                                            <Td>e-mail</Td>
                                            <Td>{memberInfo.user.email}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>프로젝트 역할</Td>
                                            <Td>
                                                <Select size="sm" value={memberInfo.projectRole} onChange={(e)=>{
                                                    setMemberInfo((prev) => ({
                                                        ...prev, 
                                                        projectRole : e.target.value
                                                    }))
                                                }}>
                                                    {projectRoles.map((projectRole, idx)=> {
                                                        return (
                                                            <option key={idx} value={projectRole}>
                                                                {getProjectRoleKR(projectRole)}
                                                            </option>
                                                        )
                                                    })}
                                                </Select>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>소속 Part</Td>
                                            <Td>
                                                <Select size="sm" placeholder="-" value={memberInfo.part?.partId || ''} onChange={(e)=>{
                                                    setMemberInfo((prev) => ({
                                                        ...prev,
                                                        part: {
                                                          ...(prev.part || {}),
                                                          partId: Number(e.target.value)
                                                        }
                                                      }));
                                                      
                                                }}>
                                                    {partList.map((part, idx)=> {
                                                        return (
                                                            <option key={idx} value={part.partId}>
                                                                {part.partNm}
                                                            </option>
                                                        )
                                                    })}
                                                </Select>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td></Td>
                                            <Td>
                                            <Flex justify="flex-end">
                                                <Button bg="brand.200" color="white" size="sm" onClick={()=>updateMember()}>저장</Button>
                                            </Flex>
                                            </Td>
                                        </Tr>
                                        </Tbody>
                                        <Tfoot>

                                        </Tfoot>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    ) : (
                        <></>
                    )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}
export default MemberInfo;
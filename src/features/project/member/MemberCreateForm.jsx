import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, 
    Stack, StackDivider, Box, Text, ListItem, List, ListIcon, Flex ,
    FormControl, FormLabel, FormHelperText, useToast,
    Button, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Input,
    Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Select} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { MdCheckCircle, MdSettings, MdOutlineSell } from "react-icons/md";
import { searchUserAPI } from '../../user/userAPI';
import { getProjectRoles } from '../../../utils/commonUtils';
import { createMemberAPI } from './memberAPI';

const MemberCreateForm = ({projectId, onCreate}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [searchUser, setSearchUser] = useState("");
    const [searchUserList, setSearchUserList] = useState([]);
    const [createMemberList, setCreateMemberList] = useState([]);

    const projectRoles = getProjectRoles();

    const closeModal = async() => {
        onClose();
        setSearchUser("");
        setSearchUserList([]);
        setCreateMemberList([]);
    }

    const searchUserNm = async () => {
        const params = {
            userNm : searchUser
        }
        const response = await searchUserAPI(params);
        
        if(response.data){
            setSearchUserList(response.data);
            if(response.data.length === 0){
                toast({
                    title: "사용자 검색",
                    description: "사용자 검색 결과가 없습니다.",
                    status: 'warning',
                    duration: 3000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
                })
            }
        }
    }

    const setCreateMember = async (elm) => {
        const isDuplicate = createMemberList.some(member => member.userId === elm.userId);
        if(!isDuplicate){
            setCreateMemberList(prevList => [...prevList, elm]);
        }else{
            toast({
                title: "사용자 추가",
                description: "이미 추가된 사용자입니다.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        }
    }

    const createMember = async () => {
        
        const data = [];

        try{
            createMemberList.forEach((elm) => {
                console.log(elm);
                let member = {};
                member.userId = elm.userId;
                if(!elm.projectRole){
                    throw new Error(elm.userNm+" 역할 지정 필요." );
                }
                member.projectRole = elm.projectRole;
                data.push(member);
            })
        }catch(error){
            toast({
                title: "프로젝트 멤버 에러",
                description: error.message,
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            })
            return;
        }
        
        try{
            const response = await createMemberAPI(data, projectId);
            if(response.data){
                toast({
                    title: "프로젝트 멤버",
                    description: "프로젝트 멤버 추가 완료" ,
                    status: 'success',
                    duration: 3000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
                });
                closeModal();
                onCreate();
            }
        }catch(error){
            toast({
                title: "프로젝트 멤버",
                description: "프로젝트 멤버 추가 실패 ["+error.status+"]" ,
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            });
        }
        
    }

    const updateMemberRole = async (index, projectRole) => {
        setCreateMemberList(prevList =>
            prevList.map((member, memberIdx) =>
                memberIdx === index ? { ...member, projectRole: projectRole } : member
            )
        );
    }

    return (
            <>
                <Button size="md" bg="white" color="black" _hover={{ bg: 'brand.100' }} onClick={onOpen}>
                    <AddIcon boxSize={5} />
                </Button>
                <Modal isOpen={isOpen} onClose={closeModal} size='3xl'>
                    <ModalOverlay />
                    <ModalContent minH="400px">
                        <ModalHeader>프로젝트 멤버 추가</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex justify="space-between" align="center" gap={4}>
                                <Accordion allowToggle w="100%" border="1px solid #ccc" borderRadius="md" p={4} minH="300px">
                                    <Flex justify="space-between" align="center" gap={4} mb={1}>
                                        <Input 
                                            placeholder='사용자 명'
                                            value={searchUser}
                                            onChange={(e)=> setSearchUser(e.target.value)}
                                        />
                                        <Button onClick={() => searchUserNm()}>검색</Button>
                                    </Flex>
                                    {searchUserList.map((elm, idx) => {
                                        return (
                                            <AccordionItem key={idx} mb={1}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as='span' flex='1' textAlign='left'>
                                                            {elm.userNm}({elm.teamNm})
                                                        </Box>
                                                        <Button size="md" bg="white" color="black" _hover={{ bg: 'brand.100' }}
                                                            onClick={() => setCreateMember(elm)}
                                                        >
                                                            <AddIcon boxSize={2} />
                                                        </Button>
                                                    </AccordionButton>
                                                </h2>
                                            </AccordionItem>
                                        )
                                    })}
                                </Accordion>
                                <Accordion allowToggle w="100%" border="1px solid #ccc" borderRadius="md" p={4} minH="300px">
                                    {createMemberList.map((elm, idx) => {
                                        return (
                                            <AccordionItem key={idx} mb={1}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Flex justify="space-between" align="center" width="100%">
                                                            <Box as='span'>
                                                                {elm.userNm}({elm.teamNm})
                                                            </Box>
                                                            <Box as='span'>
                                                                <Select placeholder='-' size="sm"
                                                                onChange={(e)=> updateMemberRole(idx, e.target.value)}>
                                                                    {projectRoles.map((projectRole, idx)=> {
                                                                        return (
                                                                            <option key={idx} value={projectRole}>{projectRole}</option>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </Box>
                                                        </Flex>
                                                    </AccordionButton>
                                                </h2>
                                            </AccordionItem>
                                        )
                                    })}
                                </Accordion>
                            </Flex>
                            <FormControl mt={3} mb={3}>
                            <Button 
                                bg="brand.200" 
                                color="white" 
                                width="100%"
                                onClick={()=>createMember()}>
                                프로젝트 멤버 추가
                            </Button>
                            </FormControl>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
      )
      

}

export default MemberCreateForm;
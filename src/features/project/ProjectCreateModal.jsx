import React, { useState } from 'react';
import { 
    useDisclosure, Button, Divider, Stack, useToast ,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createProjectAPI } from './projectAPI';

const ProjectCreateModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [projectNm, setProjectNm] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endtDate, setEndDate] = useState(new Date());

    const closeModal = async() => {
        onClose();
        setProjectNm("");
        setProjectDesc("");
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const createProject = async () => {

        let webCheckFlag = true;
        let title = "";
        let desc = "";

        if(projectNm.length <= 5 || projectNm.length > 15 ){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "프로젝트 이름은 5자 이상 15자 미만 입니다."
        }

        if(projectDesc.length >= 30){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "프로젝트 설명은 30자 이하 입니다."
        }

        if(!webCheckFlag){
            toast({
                title: title,
                description: desc,
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            });
            return;
        }

        try{
            const response = await createProjectAPI({
                projectName : projectNm,
                projectDesc : projectDesc,
                startDt : startDate,
                endDt : endtDate
            });

            if(response.data){
                console.log(response.data);
                toast({
                    title: "프로젝트 생성 완료",
                    description: response.data.projectName+" 생성 완료" ,
                    status: 'success',
                    duration: 3000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
                })
                closeModal();
            }

        }catch(error){
            toast({
                title: "프로젝트 생성 실패",
                description: error.response.data,
                status: 'error',
                duration: 3000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            })
            
        }
    }

    return (
        <>
        <Button size='xs' ml='5' onClick={onOpen}>
            <AddIcon/>
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>프로젝트 생성</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={5}>
                <FormControl isRequired>
                    <FormLabel>프로젝트 명</FormLabel>
                    <Input 
                        placeholder='프로젝트 이름'
                        value={projectNm}
                        onChange={(e)=> setProjectNm(e.target.value)}
                        />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>프로젝트 설명</FormLabel>
                    <Input
                        placeholder='프로젝트 설명'
                        value={projectDesc}
                        onChange={(e)=> setProjectDesc(e.target.value)}
                        />
                    <FormHelperText>간단한 프로젝트 설명을 입력해주세요</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>프로젝트 시작일</FormLabel>
                    <DatePicker
                        locale={ko}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        customInput={<Input />}
                        dateFormat="yyyy-MM-dd"
                        placeholderText='시작일(yyyy-MM-dd)'
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>프로젝트 종료일</FormLabel>
                    <DatePicker
                        locale={ko}
                        selected={endtDate}
                        onChange={(date) => setEndDate(date)}
                        customInput={<Input />}
                        dateFormat="yyyy-MM-dd"
                        placeholderText='종료일(yyyy-MM-dd)'
                    />
                </FormControl>
                <FormControl>
                <Button 
                    bg="brand.200" 
                    color="white" 
                    width={400}
                    onClick={createProject}>
                    프로젝트 생성
                </Button>
                </FormControl>
            </Stack>
            
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ProjectCreateModal
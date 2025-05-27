import { AddIcon } from "@chakra-ui/icons";
import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent,
    ModalHeader, ModalOverlay, Stack, useDisclosure, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createPartAPI } from './partAPI';
const PartCreateForm = ({projectId, onCreate}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [partNm, setPartNm] = useState("");
    const [partDesc, setPartDesc] = useState("");

    const closeModal = async() => {
        onClose();
        setPartNm("");
        setPartDesc("");
    }

    const createPart = async () => {

        let webCheckFlag = true;
        let title = "";
        let desc = "";

        if(partNm.length == 0 || partNm.length >= 10){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "프로젝트 Part 명은 10자 이하 입니다."
        }

        if(partDesc.length == 0 || partDesc.length >= 30){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "프로젝트 Part 설명은 30자 이하 입니다."
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
            const response = await createPartAPI({
                partNm : partNm,
                partDesc : partDesc
            }, projectId);

            if(response.data){
                toast({
                    title: "프로젝트 Part 생성 완료",
                    description: response.data.partNm+" 생성 완료" ,
                    status: 'success',
                    duration: 3000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
                })
                closeModal();
                onCreate();
            }

        }catch(error){
            toast({
                title: "프로젝트 Part 생성 실패",
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
        <Button size="md" bg="white" color="black" _hover={{ bg: 'brand.100' }}
            onClick={onOpen}>
            <AddIcon boxSize={5} />
        </Button>
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>프로젝트 Part 생성</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={5}>
                <FormControl isRequired>
                    <FormLabel>프로젝트 Part 명</FormLabel>
                    <Input 
                        placeholder='프로젝트 Part 명'
                        value={partNm}
                        onChange={(e)=> setPartNm(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>프로젝트 Part 설명</FormLabel>
                    <Input 
                        placeholder='프로젝트 Part 설명'
                        value={partDesc}
                        onChange={(e)=> setPartDesc(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                <Button 
                    bg="brand.200" 
                    color="white" 
                    width={400}
                    onClick={createPart}>
                    프로젝트 Part 생성
                </Button>
                </FormControl>
            </Stack>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default PartCreateForm;



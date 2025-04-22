import React, { useState } from 'react';
import { 
    useDisclosure, Button, Divider, Stack,
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

const ProjectCreateModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [startDate, setStartDate] = useState(new Date());
    const [endtDate, setEndDate] = useState(new Date());

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
                    <Input type='email' placeholder='프로젝트 이름'/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>프로젝트 설명</FormLabel>
                    <Input type='email' placeholder='프로젝트 설명'/>
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
                <Button bg="brand.200" color="white" width={400}>
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
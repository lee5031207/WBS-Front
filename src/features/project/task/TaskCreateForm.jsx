import React, { useState, useEffect } from 'react';
import { 
    useDisclosure, Button, Divider, Stack, useToast ,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl, FormLabel, FormHelperText, Input,
    Select 
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';

const TaskCreateForm = ({isOpen, onOpen, onClose, taskInfo, memberList}) => {

    useEffect(() => {
    }, [memberList]);

    const toast = useToast();

    const [taskNm, setTaskNm] = useState("");
    const [planStartDt, setPlanStartDt] = useState(new Date());
    const [planEndDt, setPlanEndDt] = useState(new Date());
    const [chargeId, setChargeId] = useState("");
    const [weight, setWeight] = useState("");
    const [remark, setRemark] = useState("");

    const closeModal = async() => {
        onClose();
        setTaskNm("");
        setPlanStartDt(new Date());
        setPlanEndDt(new Date());
        setWeight("");
        setRemark("");
    }

    const createTask = async () => {
        let webCheckFlag = true;
        let title = "";
        let desc = "";

        if(taskNm.length ==0 || taskNm.length > 15 ){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "작업 명은 15자 미만 입니다."
        }

        if(remark.length >= 30){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "비고는 30자 이하 입니다."
        }

        if (chargeId == "" ){
            webCheckFlag = false;
            title = "입력 오류";
            desc = "담당자를 선택하십시오.";
        }

        if (isNaN(weight)) {
            webCheckFlag = false;
            title = "입력 오류";
            desc = "가중치는 숫자만 입력 가능합니다.";
        } else if (Number(weight) < 1) {
            webCheckFlag = false;
            title = "입력 오류";
            desc = "가중치는 1 이상 입력 가능합니다.";
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


        

    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>작업 생성</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={5}>
                            <FormControl isRequired>
                                <FormLabel>작업 명</FormLabel>
                                <Input 
                                    placeholder='작업 명'
                                    value={taskNm}
                                    onChange={(e)=> setTaskNm(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>시작일(계획)</FormLabel>
                                <DatePicker
                                    locale={ko}
                                    selected={planStartDt}
                                    onChange={(date) => setPlanStartDt(date)}
                                    customInput={<Input />}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText='시작일(계획)(yyyy-MM-dd)'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>종료일(계획)</FormLabel>
                                <DatePicker
                                    locale={ko}
                                    selected={planEndDt}
                                    onChange={(date) => setPlanEndDt(date)}
                                    customInput={<Input />}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText='종료일(계획)(yyyy-MM-dd)'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>담당자</FormLabel>
                                <Select placeholder='-' onChange={(e)=> setChargeId(e.target.value)}>
                                    {memberList.map((elm, idx)=>{
                                        return (
                                            <option key={elm.prjMemId} value={elm.prjMemId}>{elm.user.userNm}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>가중치</FormLabel>
                                <Input 
                                    placeholder='가중치'
                                    value={weight}
                                    onChange={(e)=> setWeight(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>비고</FormLabel>
                                <Input 
                                    placeholder='비고'
                                    value={remark}
                                    onChange={(e)=> setRemark(e.target.value)}
                                />
                            </FormControl>
                            <Button 
                                bg="brand.200" 
                                color="white" 
                                width={400}
                                onClick={createTask}>
                                작업 생성
                            </Button>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TaskCreateForm
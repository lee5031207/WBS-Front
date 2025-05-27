import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent,
    ModalHeader, ModalOverlay, Select, Stack, useToast
} from '@chakra-ui/react';
import { ko } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { createTaskAPI } from './taskAPI';

const TaskCreateForm = ({isOpen, onOpen, onClose, taskInfo, memberList, projectId, onCreate}) => {

    useEffect(() => {
    }, [memberList]);

    const toast = useToast();

    const [taskNm, setTaskNm] = useState("");
    const [chargeId, setChargeId] = useState("");
    const [planStartDt, setPlanStartDt] = useState(new Date());
    const [planEndDt, setPlanEndDt] = useState(new Date());
    const [weight, setWeight] = useState("");
    const [remark, setRemark] = useState("");

    const closeModal = async() => {
        onClose();
        setTaskNm("");
        setChargeId("");
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

        try{
            const response = await createTaskAPI(projectId, {
                taskNm : taskNm,
                parentTaskId : taskInfo.parentTaskId,
                chargeId : chargeId,
                planStartDt : planStartDt,
                planEndDt : planEndDt,
                weight : weight,
                remark : remark
            })

            if(response.data){
                toast({
                    title: "작업 생성 완료",
                    description: response.data.taskId+" 생성 완료" ,
                    status: 'success',
                    duration: 3000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
                })
                onCreate('create', response.data);
                closeModal();
            }

        }catch(error){
            toast({
                title: "작업 생성 실패",
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
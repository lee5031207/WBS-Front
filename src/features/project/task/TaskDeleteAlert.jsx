import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    UnorderedList, ListItem,
    Button, ButtonGroup, Box, Text,
    useToast
  } from '@chakra-ui/react'
import { deleteTaskAPI } from './taskAPI';

const TaskDeleteAlert = ({isOpen, onOpen, onClose, cancelRef, descendants, projectId, onDelete}) => {

    useEffect(() => {
    }, [descendants]);

    const toast = useToast();

    const deleteTasks = async () => {
        try{
            const response = await deleteTaskAPI(projectId, descendants[0].taskId);
            if(response.status == 200){
                toast({
                    title: "삭제 완료",
                    description: "TSAKID["+descendants[0].taskId+"] 삭제 완료" ,
                    status: 'success',
                    duration: 1000,     // 3초 후 사라짐
                    isClosable: true,   // 닫기 버튼 있음
                    position: 'bottom-right',    // top, top-right, bottom-right 등 설정 가능
                })
                onDelete('delete', descendants[0]);
              }
        }catch(error){
            toast({
                title: "작업 삭제 실패",
                description: error.response.data,
                status: 'error',
                duration: 1000,     // 3초 후 사라짐
                isClosable: true,   // 닫기 버튼 있음
                position: 'bottom',    // top, top-right, bottom-right 등 설정 가능
            })
        }
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                작업 삭제
                </AlertDialogHeader>
                <AlertDialogBody>
                <Text fontSize='md'>삭제 시 하위 작업({descendants.length-1} 개) 모두 삭제됩니다.</Text>
                <Text fontSize='md'>삭제 하시겠습니까?</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    취소
                </Button>
                <Button colorScheme='red' ml={3} onClick={() =>{
                    onClose();
                    deleteTasks();
                }}>
                    삭제
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default TaskDeleteAlert
import {
    Avatar, AvatarGroup, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption,
    TableContainer, Tbody, Td, Text, Tfoot, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "../../utils/token";

const MyInfoModal = () => {

    const navigate = useNavigate(); 

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [userInfo, setUserInfo] = useState({});
    useEffect(() =>{
        try{
            setUserInfo(getDecodedToken());
        }catch(error){
            console.log(error);
        }
    }, []);


    const logout = async () => {
        onClose();
        localStorage.removeItem('WBS_GRANT_TYPE');
        localStorage.removeItem('WBS_ACCESS_TOKEN');
        await axios.post("/api/auth/logout");
        navigate("/login");
    }

    return (
        <>
            <AvatarGroup spacing='1rem' mr='5'>
                    <Avatar bg='brand.100' cursor="pointer" onClick={onOpen} />
            </AvatarGroup>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>내 정보</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Card width='100%' height='100%'>
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar bg='brand.100'/>
                                <Box>
                                <Heading size='sm'>{userInfo?.userNm}</Heading>
                                <Text>{userInfo?.teamNm}</Text>
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
                                    <TableCaption>사용자 정보</TableCaption>
                                    <Thead></Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>e-mail</Td>
                                            <Td>{userInfo?.email}</Td>
                                        </Tr>
                                    </Tbody>
                                    <Tfoot>

                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button bg="brand.200" color="white" mr={3} onClick={logout}>
                        로그아웃
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MyInfoModal
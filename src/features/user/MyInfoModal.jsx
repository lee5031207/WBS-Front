import { 
    Card, CardHeader, CardBody, CardFooter,
    Flex, Avatar, Heading, Text, IconButton, UnorderedList, ListItem, ListIcon, List, useToast,
    useDisclosure, Box, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Select,
    Button,
    AvatarGroup,
    ModalFooter
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDecodedToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

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


    const logout = () => {
        onClose();
        localStorage.removeItem('WBS_GRANT_TYPE');
        localStorage.removeItem('WBS_ACCESS_TOKEN');
        localStorage.removeItem('WBS_REFRESH_TOKEN');
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
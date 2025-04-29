import { 
    Card, CardHeader, CardBody, CardFooter,
    Flex, Avatar, Heading, Text, IconButton, UnorderedList, ListItem, ListIcon, List,
    useDisclosure, Box, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { MdCheckCircle, MdSettings, MdOutlineSell } from "react-icons/md";

const MemberInfo = ( {memberInfo} ) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box as="span" flex="1" textAlign="left" onClick={onOpen}>
                {memberInfo.user.userNm} [{memberInfo.projectRole}]
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent minH="300px">
                    <ModalHeader>프로젝트 멤버 정보</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Card width='100%' height='100%'>
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                {/*<Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' /> */}
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
                            <List spacing={2}>
                                <ListItem>
                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                    e-mail : {memberInfo.user.email}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                    프로젝트 역할 : {memberInfo.projectRole}
                                </ListItem>
                            </List>
                        </CardBody>
                        <CardFooter>

                        </CardFooter>
                        </Card>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}
export default MemberInfo;
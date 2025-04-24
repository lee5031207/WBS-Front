import { 
    Avatar, useDisclosure, AvatarGroup,
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

const MyInfoModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

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

                </ModalBody>
                <ModalFooter>
                    <Button bg="brand.200" color="white" mr={3} onClick={onClose}>
                        로그아웃
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MyInfoModal
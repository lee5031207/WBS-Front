import { 
    useDisclosure, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const ProjectCreateModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

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

            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ProjectCreateModal
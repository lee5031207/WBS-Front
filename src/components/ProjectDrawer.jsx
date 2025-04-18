import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react'
import ProjectCreateModal from "./ProjectCreateModal";


const ProjectDrawer = () =>{

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <>
            <Button bg="brand.200" color="white" _hover={{ bg: 'brand.300' }} ref={btnRef} onClick={onOpen}>
                Projects
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        프로젝트 List
                        <ProjectCreateModal/>
                    </DrawerHeader>
                    <DrawerBody>

                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default ProjectDrawer;
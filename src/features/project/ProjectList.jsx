import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Button, Drawer,
    DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, List, ListIcon, ListItem, useDisclosure
} from '@chakra-ui/react';
import React, { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getProjectListAPI } from "./projectAPI";
import ProjectCreateForm from "./ProjectCreateForm";


const ProjectList = () =>{

    const navigate = useNavigate(); 

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const [projectData, setProjectData] = useState([]);

    const getProjectList = async () => {
        const response = await getProjectListAPI();        
        if(response.data){
            setProjectData(response.data);
        }
    }


    return (
        <>
            <Button size="md" bg="white" color="blcak" _hover={{ bg: 'brand.100' }} ref={btnRef} 
                onClick={() =>{
                    onOpen();
                    getProjectList();
                }
            }>
                <HamburgerIcon size="lg"/>
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
                        <p>프로젝트 목록</p>
                        <ProjectCreateForm onCreate={getProjectList}/>
                    </DrawerHeader>
                    <DrawerBody>
                        <List spacing={3}>
                            {projectData.map((elm, idx) => (
                                <ListItem key={idx} cursor="pointer" onClick={() => {
                                    navigate(`/projects/${elm.projectId}`);
                                    onClose();
                                }}>
                                    <ListIcon as={MdCheckCircle} color='green.500'/>
                                    {elm.projectName}
                                </ListItem>
                            ))}
                        </List>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default ProjectList;
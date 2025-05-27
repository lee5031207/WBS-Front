import { Box, Divider, Text } from '@chakra-ui/react';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProjectInfo from "../features/project/ProjectInfo";
import ProjectWBS from "../features/project/ProjectWBS";

const MainPage = () => {

    const [tabState, setTabState] = useState(0);
    const { id: projectId } = useParams();

    const handelTabs = (index) => {
        setTabState(index);
    }

    return (
        <>
            <Header onchangeTabs={handelTabs}/>
            <Divider orientation='horizontal' />
            {!projectId 
                ? 
                <>
                    <Box p={4} textAlign="center">
                        <Text fontSize="3xl" color="gray.500">
                            먼저 프로젝트를 선택해주세요!
                        </Text>
                    </Box>
                </> 
                : 
                <>
                    {tabState === 0 && <ProjectInfo projectId={projectId}/>}
                    {tabState === 1 && <ProjectWBS projectId={projectId}/>}
                </>
            }
        </>
    )
}

export default MainPage;
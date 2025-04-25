import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { Divider } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import ProjectInfo from "../features/project/ProjectInfo";
import ProjectWBS from "../features/project/ProjectWBS"; 

const MainPage = ({}) => {

    const [tabState, setTabState] = useState(0);
    const { id: projectId } = useParams();

    const handelTabs = (index) => {
        setTabState(index);
    }

    return (
        <>
            <Header onchangeTabs={handelTabs}/>
            <Divider orientation='horizontal' />
            {tabState === 0 && <ProjectInfo projectId={projectId}/>}
            {tabState === 1 && <ProjectWBS projectId={projectId}/>}
        </>
    )
}

export default MainPage;
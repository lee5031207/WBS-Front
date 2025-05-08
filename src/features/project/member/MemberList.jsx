import { useState, useEffect } from "react";
import { Card, CardHeader, Flex, Heading, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import MemberCreateForm from "./MemberCreateForm";
import { getMemberListAPI } from "./memberAPI";
import { getPartListAPI } from "../part/partAPI";
import MemberInfo from "./MemberInfo";

const MemberList = ({ members, onCreateMember, onUpdateMember, projectId }) => {

    const getMemberList = async() => {
        try{
            const response = await getMemberListAPI(projectId)
            onCreateMember(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const getPartList = async () => {
        try{
            const response = await getPartListAPI(projectId)
            onUpdateMember(response.data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Card w="25vw" h="80vh">
            <CardHeader>
            <Flex justify="space-between" align="center">
                <Heading size="md">프로젝트 멤버</Heading>
                <MemberCreateForm projectId={projectId} onCreate={getMemberList}/>
            </Flex>
            </CardHeader>
            <Accordion defaultIndex={[0]} allowMultiple>
                {members.map((member, idx) => {
                    return (
                        <AccordionItem key={member.prjMemId}>
                            <h2>
                            <AccordionButton>
                                <MemberInfo 
                                    userNm={member.user.userNm} 
                                    teamNm={member.user.teamNm}
                                    projectId={projectId}
                                    prjMemId={member.prjMemId}
                                    onUpdate={getPartList}
                                />
                            </AccordionButton>
                            </h2>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </Card>
    )
}

export default MemberList;
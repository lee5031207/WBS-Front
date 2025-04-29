import { useState, useEffect } from "react";
import { Card, CardHeader, Flex, Heading, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import MemberCreateForm from "./MemberCreateForm";
import { getMemberListAPI } from "./memberAPI";
import MemberInfo from "./MemberInfo";

const MemberList = ({ members, projectId }) => {

    const [memberList, setMemberList] = useState(members || []);

    useEffect(() => {
        if (members) {
            setMemberList(members);
        }
    }, [members]);

    const getMemberList = async () => {
        const response = await getMemberListAPI(projectId);
        if(response.data){
            setMemberList(response.data);
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
                {memberList.map((elm, idx) => {
                    return (
                        <AccordionItem key={idx}>
                            <h2>
                            <AccordionButton>
                                <MemberInfo memberInfo={elm}></MemberInfo>
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
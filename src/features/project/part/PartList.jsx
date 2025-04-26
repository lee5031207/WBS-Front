import { Card, CardHeader, CardBody, CardFooter, Heading, 
    Stack, StackDivider, Box, Text, ListItem, List, ListIcon, Flex ,
    Button} from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { MdCheckCircle, MdSettings, MdOutlineSell } from "react-icons/md";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import PartCreateForm from './PartCreateForm';
import { getPartListAPI, getPartDetailAPI } from './partAPI';

const PartList = ({ parts, projectId }) => {

    const [partList, setPartList] = useState(parts || []);
    const [partMembers, setPartMembers] = useState({});

    useEffect(() => {
        if (parts) {
            setPartList(parts);
        }
    }, [parts]);
    
    const getPartList = async () => {
        const response = await getPartListAPI(projectId);
        if(response.data){
            setPartList(response.data);
        }
    }

    const getPartDetail = async (partId) => {

        if(partMembers[partId]){
            return;
        }

        const response = await getPartDetailAPI(projectId, partId);
        if(response.data){
            setPartMembers((prev) => ({
                ...prev,
                [partId]: response.data.projectMembers, // 받아온 데이터 저장
            }));
        }

    }

    return (
        <Card w="25vw" h="80vh">
            <CardHeader>
            <Flex justify="space-between" align="center">
                <Heading size="md">프로젝트 Part</Heading>
                <PartCreateForm projectId={projectId} onCreate={getPartList}/>
            </Flex>
            </CardHeader>
            <Accordion defaultIndex={[0]} allowMultiple>
                {partList.map((elm, idx) => (
                    <AccordionItem key={idx}>
                        {({ isExpanded }) => {
                            if (isExpanded) {
                                getPartDetail(elm.partId); // 펼칠 때 조회
                            }
                            return (
                            <>
                                <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                    {elm.partNm}
                                    </Box>
                                    <AccordionIcon ml="3" />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                {isExpanded ? (
                                    <>
                                    {partMembers[elm.partId] ? (
                                        <div>
                                            {/* 조회한 디테일 데이터 표시 */}
                                            {partMembers[elm.partId].map((member, idx) => (
                                                <div key={idx} > ＊ {member.user.userNm}({member.user.loginId}) </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    </>
                                ) : (
                                    <></>
                                )}
                                </AccordionPanel>
                            </>
                            );
                        }}
                    </AccordionItem>
                ))}
            </Accordion>
        </Card>
    )
}

export default PartList;
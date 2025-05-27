import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardHeader, Flex, Heading } from '@chakra-ui/react';
import { getPartListAPI } from './partAPI';
import PartCreateForm from './PartCreateForm';

const PartList = ({ parts, onCreatePart, projectId }) => {
    
    const getPartList = async () => {
        try{
            const response = await getPartListAPI(projectId)
            onCreatePart(response.data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Card w="25vw" h="80vh">
            <CardHeader>
            <Flex justify="space-between" align="center">
                <Heading size="md">프로젝트 Part</Heading>
                <PartCreateForm projectId={projectId} onCreate={getPartList} />
            </Flex>
            </CardHeader>
            <Accordion defaultIndex={[0]} allowMultiple>
                {parts.map((part, idx) => (
                    <AccordionItem key={part.partId}>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {part.partNm}
                            </Box>
                            <AccordionIcon ml="3" />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            {part.projectMembers.map((member, idx)=>(
                                <div key={member.user.userId} > - {member.user.userNm} ({member.user.teamNm}) </div>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Card>
    )
}

export default PartList;
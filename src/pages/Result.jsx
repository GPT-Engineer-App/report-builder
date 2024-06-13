import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Textarea, VStack, HStack, Text } from '@chakra-ui/react';
import { FaPrint } from 'react-icons/fa';

const Result = () => {
  const [reports, setReports] = useState([]);
  const [selectedSentences, setSelectedSentences] = useState([]);
  const [finalReport, setFinalReport] = useState('');

  useEffect(() => {
    // Fetch previously generated radiological reports from the backend
    fetch('/api/reports')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);

  const handleSentenceClick = (sentence) => {
    setSelectedSentences([...selectedSentences, sentence]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFinalizeReport = () => {
    setFinalReport(selectedSentences.join(' '));
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Box w="full" p={5} bg="gray.100" borderRadius="md">
          <Text fontSize="2xl" mb={4}>Previously Generated Reports</Text>
          {reports.map((report) => (
            <Box key={report.report_id} p={4} bg="white" borderRadius="md" mb={4} shadow="md">
              <Text fontSize="lg" mb={2}>Report ID: {report.report_id}</Text>
              <Text fontSize="sm" mb={2}>Created At: {new Date(report.created_at).toLocaleString()}</Text>
              <Box>
                {report.report_content.split('. ').map((sentence, index) => (
                  <Text
                    key={index}
                    mb={2}
                    p={2}
                    bg="gray.200"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => handleSentenceClick(sentence)}
                  >
                    {sentence}.
                  </Text>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box w="full" p={5} bg="gray.100" borderRadius="md">
          <Text fontSize="2xl" mb={4}>Selected Sentences</Text>
          <Box>
            {selectedSentences.map((sentence, index) => (
              <Text key={index} mb={2} p={2} bg="gray.200" borderRadius="md">
                {sentence}.
              </Text>
            ))}
          </Box>
        </Box>

        <Box w="full" p={5} bg="gray.100" borderRadius="md">
          <Text fontSize="2xl" mb={4}>Final Report</Text>
          <Textarea value={finalReport} onChange={(e) => setFinalReport(e.target.value)} placeholder="Your final report will appear here..." size="lg" />
          <HStack spacing={4} mt={4}>
            <Button colorScheme="teal" onClick={handleFinalizeReport}>Finalize Report</Button>
            <Button colorScheme="blue" leftIcon={<FaPrint />} onClick={handlePrint}>Print Report</Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Result;
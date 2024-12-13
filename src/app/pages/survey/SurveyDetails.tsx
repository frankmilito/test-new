import { overviewList } from "@/app/components/overview";
import Wrapper from "@/app/components/wrapper";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Box,
  Card,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbCircleFilled, TbDots } from "react-icons/tb";
import { useParams } from "react-router-dom";

const SurveyDetails = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const survey = useAppSelector(surveySelector.getCurrentSurvey);
  const isLoading = useAppSelector(surveySelector.isLoading);

  useEffect(() => {
    dispatch(surveyActions.getSurvey(id));
  }, [id]);

  return (
    <Wrapper>
      <Flex align="center" justify="center" mt="8">
        <Box w="3xl">
          {isLoading ? (
            <Stack w="2xl">
              <Skeleton height="20px" />
              <Skeleton height="50px" />
              <Skeleton height="500px" />
            </Stack>
          ) : (
            <Stack justify={"center"}>
              <Flex justify="space-between" my="4">
                <Stack>
                  <Heading fontWeight="medium">{survey.title}</Heading>
                  <Text>{survey.description}</Text>
                  <Text>
                    {t("survey.lastUpdated")} {survey.updatedAt}
                  </Text>
                </Stack>
                <Flex>
                  <Flex align="center" color="brand.700" fontSize="sm">
                    <Image src="/edit.svg" mr="1" />
                    <Link fontSize="md" fontWeight={"medium"} mr="2">
                      {t("common.edit")}
                    </Link>
                  </Flex>
                  <Flex align="center">
                    <Icon as={TbDots} mr={1} size="xl" />
                  </Flex>
                </Flex>
              </Flex>
              <Card bg="#f4f4f4" p="4" variant="outline" rounded="lg">
                <Box bg="white" rounded="md" p="4">
                  <Tabs>
                    <TabList>
                      <Tab>Overview</Tab>
                      <Tab>Responses</Tab>
                      <Tab>
                        Questions <Tag ml="1">{survey.questions.length}</Tag>
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <Grid
                          templateColumns={{
                            sm: "repeat(1, 1fr)",
                            md: "repeat(3, 1fr)",
                          }}
                          gap={6}
                        >
                          <Card
                            variant="outline"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            // p={4}
                            borderColor="primary.100"
                          >
                            <GridItem w="100%" p="5" gap={100}>
                              <Image
                                src={`/response.svg`}
                                bgSize="40px"
                                bg="#B7D9FE"
                                p="3"
                                rounded="lg"
                              />
                              <Text
                                color="primary.600"
                                fontWeight="medium"
                                my="2"
                              >
                                Total Response(s)
                              </Text>
                              <Text fontWeight="semibold" fontSize={"xl"}>
                                N/A
                              </Text>
                            </GridItem>
                          </Card>
                          <Card
                            variant="outline"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            // p={4}
                            borderColor="primary.100"
                          >
                            <GridItem w="100%" p="5" gap={100}>
                              <Image
                                src={`/percent.svg`}
                                bg="#B7D9FE"
                                p="3"
                                rounded="lg"
                              />
                              <Text
                                color="primary.600"
                                fontWeight="medium"
                                my="2"
                              >
                                Completion Rate
                              </Text>
                              <Text fontWeight="semibold" fontSize={"xl"}>
                                N/A
                              </Text>
                            </GridItem>
                          </Card>
                          <Card
                            variant="outline"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            // p={4}
                            borderColor="primary.100"
                          >
                            <GridItem w="100%" p="5" gap={100}>
                              <Image
                                src={`/timer.svg`}
                                bg="#B7D9FE"
                                p="3"
                                rounded="lg"
                              />
                              <Text
                                color="primary.600"
                                fontWeight="medium"
                                my="2"
                              >
                                Average Response Time
                              </Text>
                              <Text fontWeight="semibold" fontSize={"xl"}>
                                N/A
                              </Text>
                            </GridItem>
                          </Card>
                        </Grid>
                        {survey.questions.map((question, index) => (
                          <>
                            <Flex justify="space-between" align="center">
                              <HStack py="5" key={question._id}>
                                <Tag bg="#1883FD" color="white" rounded="full">
                                  {index + 1}
                                </Tag>
                                <Text>{question.questionText}</Text>
                              </HStack>
                              <Link>
                                <HStack>
                                  <Image src="/chart.svg" />
                                  <Text fontWeight={"medium"} color="brand.700">
                                    View Analytics
                                  </Text>
                                </HStack>
                              </Link>
                            </Flex>
                            <hr />
                          </>
                        ))}
                      </TabPanel>
                      <TabPanel>
                        <p>Responses!</p>
                      </TabPanel>
                      <TabPanel>
                        {survey.questions.map((question) => (
                          <>
                            <Flex justify="space-between" align="center">
                              <HStack py="5" key={question._id}>
                                <Tag bg="#1883FD" color="white" rounded="full">
                                  {1}
                                </Tag>
                                <Text>{question.questionText}</Text>
                              </HStack>
                              <Link>
                                <HStack>
                                  <Image src="/chart.svg" />
                                  <Text fontWeight={"medium"} color="brand.700">
                                    View Analytics
                                  </Text>
                                </HStack>
                              </Link>
                            </Flex>
                            <hr />
                          </>
                        ))}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </Card>
            </Stack>
          )}
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default SurveyDetails;

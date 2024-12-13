import {
  Center,
  Divider,
  Grid,
  GridItem,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import DashboardCard from "../card/DashboardCard";

export const overviewList = [
  {
    icon: "/total_surveys",
    title: "Total Survey(s)",
    count: 20,
  },
  {
    icon: "/active_surveys",
    title: "Active Survey(s)",
    count: 45,
  },
  {
    icon: "/completed_surveys",
    title: "Completed Survey(s)",
    count: 80,
  },
  {
    icon: "/total_responses",
    title: "Total Responses(s)",
    count: 12430,
  },
];
const Overview = () => {
  return (
    <DashboardCard
      title="Overview"
      headerComponent={
        <Select borderColor="primary.200">
          <option value="option1">This year</option>
          <option value="option2">Last month</option>
          <option value="option3">Last year</option>
        </Select>
      }
    >
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {overviewList.map((item, index) => (
          <GridItem
            key={item.title}
            w="100%"
            p="5"
            gap={100}
            borderRight={
              index !== overviewList.length - 1 ? "3px solid #f9f9f9" : "none"
            }
          >
            <Image src={`${item.icon}.svg`} bgSize="40px" />
            <Text color="primary.600" fontWeight="medium" my="2">
              {item.title}
            </Text>
            <Text fontWeight="bold" fontSize={"3xl"}>
              {item.count}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default Overview;

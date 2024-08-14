'use client';
import React from 'react';
import {
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast,
  Tabs,
  TabList,
  Tab,
  HStack,
} from '@chakra-ui/react';
import { Heatmap } from '@/components';
import { ChartDataT } from '@/components/base/heatmap';
import { format } from 'date-fns';

function isValidGitHubUrl(url: string): boolean {
  const githubUrlRegex =
    /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9._-]+)?(\/)?$/;
  return githubUrlRegex?.test(url);
}

function extractGitHubUsername(url: string, fallback = ""): string {
  const githubUsernameRegex =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9_-]+)(?:\/|$)/;
  const match = url?.match(githubUsernameRegex);

  return match ? match[1] : fallback;
}

const today = new Date();

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const startDate = shiftDate(today, -368)?.toISOString();
const endDate = today?.toISOString();

type ContributionDataT = {
  name: string;
  totalContributions: number;
  data: ChartDataT[];
};

const Home = () => {
  const toast = useToast();

  const [tabIndex, setTabIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [contributionData, setContributionData] = React.useState<
    ContributionDataT | undefined
  >();

  const searchValue = React.useMemo(
    () => (searchQuery ? searchQuery?.toLowerCase().trim() : ''),
    [searchQuery]
  );

  const hasData = contributionData && contributionData?.data?.length > 0;

  const getStats = async (e: React.SyntheticEvent) => {
    e?.preventDefault();

    if (tabIndex === 0 && !isValidGitHubUrl(searchQuery)) {
      toast({ status: 'info', title: 'Invalid URL' });
      return;
    }

    const username = extractGitHubUsername(searchQuery, searchQuery);    

    if (username) {
      setLoading(true);
      const res = await fetch(
        `/api/stats?username=${username}&start=${startDate}&end=${endDate}`
      );

      const data = await res.json();

      if (res.status === 200) {
        const user = data?.user;
        const userFullname = user?.name;

        if (user && userFullname) {
          const contributionCalendar =
            user?.contributionsCollection.contributionCalendar;

          const contributionsByWeek = (
            contributionCalendar?.weeks as [][]
          )?.flat();

          if (
            Array.isArray(contributionsByWeek) &&
            contributionsByWeek?.length > 0
          ) {
            const contributionsByDay = contributionsByWeek?.flatMap<ChartDataT>(
              (week: any) =>
                week?.contributionDays?.map(
                  (day: any) =>
                    ({
                      date: new Date(day?.date)?.toISOString(),
                      count: day?.contributionCount,
                    } as ChartDataT)
                )
            );

            setContributionData({
              name: userFullname,
              totalContributions: contributionCalendar?.totalContributions || 0,
              data: contributionsByDay,
            });
          }
        } else toast({ status: 'info', title: 'Unable to find a user...' });
      } else toast({ status: 'error', title: data?.message });

      setLoading(false);
    }
  };

  return (
    <Stack
      p={{ base: '1rem', md: '1.5rem' }}
      h={'100%'}
      pos={'fixed'}
      top={0}
      left={0}
      bg={'gray.100'}
      width={'100%'}
      justifyContent={'space-between'}>
      <Stack gap={10}>
        <Text align={'center'} fontWeight={600}>
          Github Stats Using Heatmap
        </Text>

        <Stack gap={5}>
          <HStack gap={2}>
            <Text fontWeight={600} fontSize={'0.75rem'}>
              Search By:
            </Text>
            <Tabs
              variant='soft-rounded'
              colorScheme='teal'
              onChange={index => setTabIndex(index)}>
              <TabList>
                <Tab fontSize={'small'}>URL</Tab>
                <Tab fontSize={'small'}>Username</Tab>
              </TabList>
            </Tabs>
          </HStack>

          <InputGroup
            as={'form'}
            size='sm'
            w={{ base: '100%', md: '50%', lg: '35%' }}
            onSubmit={getStats}>
            <Input
              pr='4.5rem'
              py={5}
              borderColor={'gray.300'}
              borderRadius={5}
              readOnly={loading}
              placeholder={
                tabIndex === 0
                  ? 'Enter github profile url...'
                  : 'Enter github username...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e?.target?.value)}
              _focusVisible={{ borderColor: 'teal.500' }}
            />
            <InputRightElement width={'max-content'} right={2} top={'5.5px'}>
              <Button
                type='submit'
                size='sm'
                colorScheme='teal'
                fontWeight={500}
                isDisabled={!!!searchValue}
                isLoading={loading}>
                Get Stats
              </Button>
            </InputRightElement>
          </InputGroup>

          <Heatmap
            startDate={startDate}
            endDate={endDate}
            data={contributionData?.data || []}
          />
        </Stack>

        {hasData && (
          <Text fontWeight={400} fontSize={'small'}>
            <Text as={'span'} fontWeight={500} fontSize={'small'}>
              {contributionData?.name}
            </Text>
            &nbsp;has made&nbsp;
            <Text
              as={'span'}
              fontWeight={600}
              fontSize={'small'}
              color={'teal'}>
              {contributionData?.totalContributions}
            </Text>
            &nbsp;contributions from {format(startDate, 'do MMM yyy')} till now.
          </Text>
        )}
      </Stack>

      <Text align={'right'} fontSize={'small'}>
        Developed by&nbsp;
        <Text
          as={'a'}
          href='https://maaz-ahmed.vercel.app/'
          target='_blank'
          color={'teal'}
          fontWeight={500}
          textDecoration={'underline'}>
          Maaz Ahmed
        </Text>
      </Text>
    </Stack>
  );
};

export default Home;

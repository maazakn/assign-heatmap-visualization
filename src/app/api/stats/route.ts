import { gql } from 'graphql-request';
import { NextRequest, NextResponse } from 'next/server';
import { graphQLClient } from '@/config/graphQL';

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const username = searchParams.get('username');
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    // check parameters
    if (!username || !start || !end) {
      return NextResponse.json(
        { message: 'Missing parameters...' },
        { status: 400 }
      );
    }

    // env check
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { message: 'Missing configuration...' },
        { status: 400 }
      );
    }

    const query = gql`
      query ($username: String!, $startDate: DateTime!, $endDate: DateTime!) {
        user(login: $username) {
          name
          contributionsCollection(from: $startDate, to: $endDate) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      username: username,
      startDate: start,
      endDate: end,
    };
    const response = await graphQLClient.request(query, variables);

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Something went wrong...' },
      { status: 500 }
    );
  }
};

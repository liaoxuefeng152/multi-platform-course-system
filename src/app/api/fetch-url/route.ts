import { NextRequest, NextResponse } from 'next/server';
import { FetchClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

  const config = new Config();
  const client = new FetchClient(config, customHeaders);

  const response = await client.fetch(url);

  return NextResponse.json({
    title: response.title,
    content: response.content,
    url: response.url,
    status: response.status_code,
  });
}

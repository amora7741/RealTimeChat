const upstashURL = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const fullURL = `${upstashURL}/${command}/${args.join('/')}`;

  console.log(fullURL);

  const response = await fetch(fullURL, {
    headers: {
      Authorization: `Bearer ${upstashToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  return response;
}

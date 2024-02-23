import { Redis } from "@upstash/redis";
const links = [
  "Crochiuri",
  "Cronica de carte",
  "Atelier literar",
  "Patrimoniu",
  "Evenimente culturale",
  "Evenimente +",
  "Crochiuri.show",
  "Cronica de carte.show",
  "Atelier literar.show",
  "Patrimoniu.show",
  "Evenimente culturale.show",
  "Evenimente +.show",
];
const redis = new Redis({
  url: import.meta.env.REDIS_URL,
  token: import.meta.env.REDIS_TOKEN,
});

//@ts-ignore
export async function GET({ params }) {
  const id = params.id;
  let res;
  if (links.includes(id)) res = await redis.lrange(id, 0, -1);
  else res = await redis.get(id);
  if (!res) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

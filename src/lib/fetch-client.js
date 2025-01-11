import { auth } from "../../auth";

export default async function fetchClient({ url, options }) {
  const session = await auth();
  console.log(`From fetch client ${JSON.stringify(session.accessToken)}`);
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });
}

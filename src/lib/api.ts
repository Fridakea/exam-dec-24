export const apiBaseUrl = "https://pentagonal-holy-beetle.glitch.me"; // "http://localhost:8080";

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

type PutReserveResult = {
  message: string;
  id: string;
  timeout: number;
};

export const putReserve = async (area: string, amount: number): Promise<PutReserveResult> => {
  const response = await fetch(`${apiBaseUrl}/reserve-spot`, {
    method: "PUT",
    headers: headersList,
    body: JSON.stringify({
      area: area,
      amount: amount,
    }),
  });

  return await response.json();
};

type PostFullfillResult = {
  error: boolean;
  message: string;
};
export const postFullfill = async (id: string): Promise<PostFullfillResult> => {
  const response = await fetch(`${apiBaseUrl}/fullfill-reservation`, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify({ id: id }),
  });

  return {
    error: response.status > 300,
    message: await response.json(),
  };
};

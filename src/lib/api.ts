import { apiBaseUrl } from "@/main";

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

export async function postFullfill(id: string) {
  const response = await fetch(`${apiBaseUrl}/fullfill-reservation`, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify({ id: id }),
  });

  return await response.json();
}

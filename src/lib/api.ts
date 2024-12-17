export const apiBaseUrl = "https://pentagonal-holy-beetle.glitch.me"; // "http://localhost:8080";

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export type AreaData = {
  area: string;
  spots: number;
  available: number;
  direction: number;
};

export type BandData = {
  name: string;
  members: string[];
  genre: string;
  logoCredits: string;
  logo: string;
  bio: string;
  slug: string;
};

type ScheduleAct = {
  start: string;
  end: string;
  act: string;
};

type Scene = "Midgard" | "Vanaheim" | "Jotunheim";
type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

// A "Record" is like an object. It takes two types, the first is the property names, the second is the value types.
// So { name: string; email: string; } is the same as Record<"name" | "email", string>.
// Its useful when you have many properties, with the same value types.
export type ScheduleData = Record<Scene, Record<Day, ScheduleAct[]>>;

export type BandPerformanceData = {
  name: string;
  day: string;
  start: string;
  end: string;
  scene: string;
};

// This function loops over all acts on all days in all scenes, to find the bands performance. Its a lot of looping.
export const getBandPerformanceData = (schedule: ScheduleData, bandName: string): BandPerformanceData | null => {
  // Iterate over each scene
  for (const [scene, days] of Object.entries(schedule)) {
    // Iterate over each day in the scene
    for (const [day, acts] of Object.entries(days)) {
      // Check each act in the day's ScheduleAct[]
      for (const act of acts) {
        if (act.act === bandName) {
          return {
            name: bandName,
            day: day, // Day of the week
            start: act.start,
            end: act.end,
            scene: scene, // Scene name
          };
        }
      }
    }
  }

  // If no performance is found
  return null;
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

"use client";
import {
  EventRange,
  EventRangeWithPositions,
  positionEvents,
} from "@/lib/calendar-utils";
import { useMemo, useState } from "react";

const SLOTS_COUNT = 24;

const EXAMPLES: EventRange[][] = [
  [
    {
      start: 1,
      end: 3,
    },
    {
      start: 3,
      end: 4,
    },
    {
      start: 1,
      end: 5,
    },
    {
      start: 1,
      end: 5,
    },
    {
      start: 8,
      end: 10,
    },
    {
      start: 8,
      end: 10,
    },
    {
      start: 8,
      end: 11,
    },
    {
      start: 8,
      end: 11,
    },
  ],
  [
    {
      start: 1,
      end: 3,
    },
    {
      start: 4,
      end: 6,
    },
    {
      start: 4,
      end: 6,
    },
    {
      start: 4,
      end: 6,
    },
    {
      start: 8,
      end: 10,
    },
    {
      start: 8,
      end: 10,
    },
  ],
];

export default function Home() {
  const slots = 24;
  const [eventInput, setEventInput] = useState(EXAMPLES[0]);
  const positions = useMemo(() => positionEvents(eventInput), [eventInput]);

  return (
    <main>
      <div className="flex">
        <div className="p-4 space-y-2">
          {EXAMPLES.map((example, i) => (
            <button
              key={i}
              onClick={() => setEventInput(positionEvents(example))}
              className="border border-gray-300 px-6 py-2 rounded hover:border-gray-800 transition block w-full"
            >
              Example {i + 1}
            </button>
          ))}
        </div>
        <div className="relative h-screen w-full flex-1">
          <div className="absolute w-full h-full">
            {[...Array(slots)].map((item, index) => (
              <div
                key={index}
                className="border-b border-b-gray-300 flex items-center px-2"
                style={{ height: `${100 / slots}%` }}
              >
                <div>{index + 1}</div>
              </div>
            ))}
          </div>
          <div className="absolute h-full left-10 top-0 right-0">
            {positions?.map((item, i) => (
              <div
                key={i}
                className="absolute z-50 rounded bg-blue-200/50 border-blue-800 border py-1 px-2"
                style={{
                  width: `${item.width}%`,
                  left: `${item.offsetX}%`,
                  top: `${(item.start / SLOTS_COUNT) * 100}%`,
                  height: `${((item.end - item.start) / SLOTS_COUNT) * 100}%`,
                }}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {positions?.map((item, i) => (
          <div key={i}>
            {i}: {JSON.stringify(item)}
          </div>
        ))}
      </div>
    </main>
  );
}

import { getOverlappingIndexes, isOverlapping } from "./calendar-utils";

test("isOverlapping", () => {
  expect(isOverlapping({ start: 1, end: 2 }, { start: 1, end: 3 })).toBe(true);
  expect(isOverlapping({ start: 0, end: 10 }, { start: 1, end: 3 })).toBe(true);
  expect(isOverlapping({ start: 1, end: 5 }, { start: 4, end: 8 })).toBe(true);
  expect(isOverlapping({ start: 1, end: 2 }, { start: 3, end: 10 })).toBe(false);
  expect(isOverlapping({ start: 5, end: 10 }, { start: 5, end: 10 })).toBe(true);
  expect(isOverlapping({ start: 1, end: 11 }, { start: 1, end: 5 })).toBe(true);
});

test("getOverlappingIndexes", () => {
  const events = [
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
      start: 1,
      end: 11,
    },
    {
      start: 9,
      end: 10,
    },
  ];
  const result = getOverlappingIndexes(events[7], events, 0);
  expect(result).toStrictEqual([0,1,2,3,4,5,6,7,8]);
});

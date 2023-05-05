export type EventRange = {
  start: number;
  end: number;
};

export type EventRangeWithPositions = {
  height: number;
  width: number;
  overlappingIndexes: number[];
  offsetX: null | number;
} & EventRange;

const isOverlapping = (range1: EventRange, range2: EventRange): boolean => {
  if (range1.end <= range2.start || range2.end <= range1.start) {
    return false;
  }
  return true;
};

const compareRanges = (a: EventRange, b: EventRange): number => {
  return a.start - b.start;
};

const getOverlappingIndexes = (
  event: EventRange,
  events: EventRange[],
  eventIndex: number
): number[] => {
  const overlappingIndexes = [];
  for (let i = 0; i < events.length; i++) {
    if (isOverlapping(events[i], event) && i !== eventIndex) {
      overlappingIndexes.push(i);
    }
  }
  return overlappingIndexes;
};

const prepareEvents = (events: EventRange[]): EventRangeWithPositions[] => {
  return events.sort(compareRanges).map((event, eventIndex) => {
    const overlappingIndexes = getOverlappingIndexes(event, events, eventIndex);

    return {
      ...event,
      offsetX: null,
      width: 0,
      height: event.end - event.start,
      overlappingIndexes,
    };
  });
};

export const positionEvents = (
  events: EventRange[]
): EventRangeWithPositions[] => {
  const result = prepareEvents(events);

  for (let index = 0; index < events.length; index++) {
    if (!result[index].offsetX) {
      const len = result[index].overlappingIndexes.length;
      const increment = 100 / (len + 1);
      let off = 0;
      result[index].offsetX = off;
      result[index].width = increment;
      off += increment;
      for (let i = 0; i < len; i++) {
        const idx = result[index].overlappingIndexes[i];
        if (!result[idx].offsetX) {
          result[idx].offsetX = off;
          result[idx].width = increment;
        }
        off += increment;
      }
    }
  }
  return result;
};

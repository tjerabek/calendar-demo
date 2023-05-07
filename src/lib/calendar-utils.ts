export type EventRange = {
  start: number;
  end: number;
};

export type EventRangeWithPositions = {
  height: number;
  width: number;
  overlappingIndexes: number[];
  offsetX: null | number;
  movedBy: null | number;
} & EventRange;

export const isOverlapping = (
  range1: EventRange,
  range2: EventRange
): boolean => {
  if (range1.end <= range2.start || range2.end <= range1.start) {
    return false;
  }
  return true;
};

export const getOverlappingIndexes = (
  event: EventRange,
  events: EventRange[],
  eventIndex: number
): number[] => {
  const overlappingIndexes = [];
  for (let i = 0; i < events.length; i++) {
    if (isOverlapping(events[i], event)) {
      overlappingIndexes.push(i);
    }
  }
  return overlappingIndexes;
};

const prepareEvents = (events: EventRange[]): EventRangeWithPositions[] => {
  return events.map((event, eventIndex) => {
    const overlappingIndexes = getOverlappingIndexes(event, events, eventIndex);

    return {
      ...event,
      offsetX: null,
      width: 0,
      height: event.end - event.start,
      overlappingIndexes,
      movedBy: null,
    };
  });
};

export const positionEvents = (
  events: EventRange[]
): EventRangeWithPositions[] => {
  let result = prepareEvents(events);

  for (let index = 0; index < events.length; index++) {
    if (!result[index].movedBy) {
      const over = result[index].overlappingIndexes;
      const width = 100 / over.length;
      result[index].offsetX = 0;
      result[index].width = width;
      result[index].movedBy = null;
      let increment = width;

      for (let oindex = 0; oindex < over.length; oindex++) {
        if (over[oindex] !== index) {
          result[over[oindex]].movedBy = index;
          result[over[oindex]].width = width;
          result[over[oindex]].offsetX = increment;
          increment += width;
        }
      }
    }
  }
  return result;
};
